"use strict";

const express = require('express');
const app = express();
const path = require('path');
const _ = require('lodash');

const PORT = process.env.PORT || 8000;
const LOGOS_PATH_ABS = path.join(process.cwd(), 'logos');

/**
 * Retrieves SVGPorn logos and augments them with proper
 * path and source properties.
 */
const svgPornLogos = _.memoize(function() {
  const logos = require(path.join(LOGOS_PATH_ABS, 'svgporn', 'app',
    '/logos.json')).items;
  return logos.map(logo => {
    return _(logo)
      .pick(logo, ['key', 'name', 'shortname', 'url',
        'tags', 'categories', 'updated'
      ])
      .assign({
        path: path.join('svgporn', 'logos', logo.files[0]),
        source: 'svgporn'
      })
      .value();
  });
});

const logos = _.union(svgPornLogos());

function searchLogos(query, key) {
  if (!query) return logos;
  key = key || 'shortname';
  let queryClean = query.replace(/[.\-() ]/gi, '').toLowerCase();
  return logos.filter(logo => {
    return logo[key].indexOf(queryClean) > -1;
  });
}

function getLogo(key, value) {
  return logos.find(logo => {
    return logo[key] === value;
  });
}

/* Search logos */
app.get('/?', (req, res) => {
  let logos = searchLogos(req.query.query);
  res.json(logos);
});

/* Get logo */
app.get('/:logo', (req, res, next) => {
  const logo = getLogo('shortname', req.params.logo);
  if (logo) {
    const logoFile = path.join(LOGOS_PATH_ABS, logo.path);
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
  console.log("Logos API listening on port %d.", PORT);
});
