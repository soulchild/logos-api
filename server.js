"use strict";

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const SVGPORN = path.join(process.cwd(), 'logos', 'svgporn');
const svgPornLogos = require(path.join(SVGPORN, 'app', '/logos.json')).items;

const PORT = process.env.PORT || 8000;

function getLogos(query) {
  if (!query) return [];
  let queryClean = query.replace(/[.\-() ]/gi, '').toLowerCase();
  return svgPornLogos.filter(logo => {
    return logo.shortname.indexOf(queryClean) > -1;
  });
}

function getLogo(key, value) {
  return svgPornLogos.find(logo => {
    return logo[key] === value;
  });
}

function serveJSON(res, result) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
}

function handleRequest(req, res) {
  let parsedURL = url.parse(req.url, true);
  let params = parsedURL.query;
  let urlPath = parsedURL.path;
  let query = params.query;
  let result;

  if (query) {
    // Search logos
    serveJSON(res, getLogos(query));
    return;
  } else if (urlPath) {
    // Serve logo
    const params = urlPath.match(/^\/(.+)$/);
    if (params) {
      const logoId = params[1];
      const logo = getLogo('shortname', logoId);
      if (logo) {
        const logoPath = path.join(SVGPORN, 'logos');
        const logoFilename = logo.files[0];
        const logoFile = path.join(logoPath, logoFilename);
        fs.stat(logoFile, (err, stats) => {
          if (err || !stats || !stats.isFile()) return;
          fs.readFile(logoFile, 'binary', (err, file) => {
            res.setHeader('Content-Type', 'image/svg+xml');
            res.write(file, 'binary');
            res.end();
          });
        });
        return;
      }
    }
  }

  if (!result) {
    res.statusCode = 404;
    result = {
      error: 'Not found'
    };
    serveJSON(res, result);
  }
}

const server = http.createServer(handleRequest);
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, () => {
  console.log("Logos API listening on port %d.", PORT);
});
