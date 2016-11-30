'use strict';

const path = require('path');
const express = require('express');
const logos = require('./lib/logos');
const app = express();

const PORT = process.env.LOGOSAPI_PORT || 8000;
const BASE_URL = process.env.LOGOSAPI_URL || 'http://localhost:' + PORT;
const LOGOS_BASE_PATH = path.join(process.cwd(), 'logos');

logos.init(LOGOS_BASE_PATH, {
  baseURL: BASE_URL
}).then(logosAPI => {
  /* Search logos */
  app.get('/?', (req, res) => {
    const { q: shortname, source } = req.query;
    let conditions = Object.assign({},
      shortname ? { shortname } : {},
      source    ? { source } : {}
    );
    res.json(logosAPI.search(conditions));
  });

  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  /* Serve logo image */
  app.get('/:id', (req, res, next) => {
    const logo = logosAPI.findById(req.params.id);
    if (logo) {
      const logoFile = path.join(LOGOS_BASE_PATH, logo.path);
      res.sendFile(logoFile, {
        headers: {
          'Content-Type': 'image/svg+xml'
        }
      });
      return;
    }
    next();
  });

  /* 404 */
  app.all('*', (req, res) => {
    res.status(404).json({
      error: 'Not found'
    });
  });

  /* Errors */
  app.use(function(err, req, res) {
    console.error(err.stack);
    res.status(err.status || 500).json(err.message);
  });

  app.listen(PORT, () => {
    console.log('Logos API serving %d logos on port %d.', logosAPI.logos.length, PORT);
  });
});
