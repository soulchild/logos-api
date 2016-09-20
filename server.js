"use strict";

const express = require('express');
const app = express();
const path = require('path');
const _ = require('lodash');

const PORT = process.env.LOGOSAPI_PORT || 8000;
const BASE_URL = process.env.LOGOSAPI_URL || 'http://localhost:' + PORT;
const LOGOS_BASE_PATH = path.join(process.cwd(), 'logos');

/* Load logos from all sources */
const gilbarbara = require('./lib/gilbarbara')(LOGOS_BASE_PATH);
const simpleicons = require('./lib/simpleicons')(LOGOS_BASE_PATH);
const logos = _.union(
  gilbarbara(),
  simpleicons()
).map(logo => Object.assign(logo, {
  // Augment every logo with full URL to image
  logoURL: BASE_URL + '/' + logo.shortname
}));

/* Search all logos by attribute */
function searchLogos(query, attribute) {
  if (!query) return logos;
  attribute = attribute || 'shortname';
  const queryClean = query.replace(/[.\-() ]/gi, '').toLowerCase();
  return logos.filter(logo => {
    return logo[attribute].indexOf(queryClean) > -1;
  });
}

/* Find logo by attribute */
const getLogo = (attribute, value) => logos
  .find(logo => logo[attribute] === value);

/* Search logos */
app.get('/?', (req, res) => {
  const logos = searchLogos(req.query.q);
  res.json(logos);
});

/* Serve logo image */
app.get('/:logo', (req, res, next) => {
  const logo = getLogo('shortname', req.params.logo);
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
  console.log("Logos API serving %d logos on port %d.", logos.length, PORT);
});
