'use strict';

const path = require('path');
const express = require('express');
const logos = require('./lib/logos');
const pkg = require('./package.json');
const { APIError } = require('./lib/errors');

const app = express();

const PORT = process.env.LOGOSAPI_PORT || 8000;
const BASE_URL = process.env.LOGOSAPI_URL || 'http://localhost:' + PORT;

const MAX_RESULTS = 50;

function prepareLogoProperties(logo) {
  const { id, name, shortname, url, source } = logo;
  return {
    id,
    name,
    shortname,
    url,
    source,
    logoURL: BASE_URL + '/logo/' + logo.id
  };
}

module.exports = {
  bootstrap: (logosBasePath, options) => {
    return logos.init(logosBasePath, options).then(logosAPI => {
      /*
       * Search logos
       */
      app.get('/?', (req, res, done) => {
        const { q: shortname, source } = req.query;
        const conditions = Object.assign(
          {},
          shortname ? { shortname } : {},
          source ? { source } : {}
        );
        const matchingLogos = logosAPI.search(conditions);
        if (matchingLogos.length > MAX_RESULTS) {
          const err = new APIError('Too many results. Please be more specific.');
          err.status = 403;
          return done(err);
        }
        res.json(matchingLogos.map(prepareLogoProperties));
      });

      /*
       * Serve logo image
       */
      app.get('/logo/:id', (req, res, next) => {
        const logo = logosAPI.findById(req.params.id);
        if (!logo) next();
        const logoFile = path.resolve(logosBasePath, logo.path);
        res.sendFile(logoFile, {
          headers: {
            'Content-Type': 'image/svg+xml'
          }
        });
      });

      /*
       * Health check
       */
      app.get('/ping', (req, res) => {
        res.json({
          name: pkg.name,
          version: pkg.version,
          stats: {
            logosTotalCount: logosAPI.getAll().length
          }
        });
      });

      /*
       * 404
       */
      app.all('*', (req, res) => {
        res.status(404).json({
          error: 'Not found'
        });
      });

      /*
       * Errors
       */
      app.use((err, req, res, done) => {
        if (res.headersSent) {
          return done(err);
        }
        if (err instanceof APIError) {
          res.status(err.status || 500).json({
            error: err.message
          });
        } else {
          console.error(err.stack);
          res.status(500).json({
            error: 'Fatal error'
          });
        }
      });

      return app;
    });
  }
};
