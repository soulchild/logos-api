'use strict';

const path = require('path');
const express = require('express');
const logos = require('./lib/logos');
const pkg = require('./package.json');
const app = express();

const PORT = process.env.LOGOSAPI_PORT || 8000;
const BASE_URL = process.env.LOGOSAPI_URL || 'http://localhost:' + PORT;
const LOGOS_BASE_PATH = path.resolve(__dirname, 'logos');

module.exports = {
  bootstrap: () => {
    return logos.init(LOGOS_BASE_PATH).then(logosAPI => {
      /*
       * Search logos
       */
      app.get('/?', (req, res) => {
        const { q: shortname, source } = req.query;
        let conditions = Object.assign({},
          shortname ? { shortname } : {},
          source    ? { source } : {}
        );
        res.json(logosAPI.search(conditions).map(treatLogoProperties));
      });

      /*
       * Serve logo image
       */
      app.get('/logo/:id', (req, res, next) => {
        const logo = logosAPI.findById(req.params.id);
        if (!logo) next();
        const logoFile = path.join(LOGOS_BASE_PATH, logo.path);
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
          'name': pkg.name,
          'version': pkg.version,
          'stats': {
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
      app.use(function(err, req, res) {
        console.error(err.stack);
        res.status(err.status || 500).json(err.message);
      });

      return app;
    });
  }
};

function treatLogoProperties(logo) {
  const { id, name, shortname, url, source } = logo;
  return {
    id, name, shortname, url, source,
    logoURL: BASE_URL + '/logo/' + logo.id
  };
}
