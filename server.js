"use strict";

const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8000;

const PATH_SVGPORN = path.join(process.cwd(), 'logos', 'svgporn');
const PATH_LOGOS = path.join(PATH_SVGPORN, 'logos');

const svgPornLogos = require(path.join(PATH_SVGPORN, 'app', '/logos.json')).items;

function searchLogos(query, key) {
  if (!query) return [];
  key = key || 'shortname';
  let queryClean = query.replace(/[.\-() ]/gi, '').toLowerCase();
  return svgPornLogos.filter(logo => {
    return logo[key].indexOf(queryClean) > -1;
  });
}

function getLogo(key, value) {
  return svgPornLogos.find(logo => {
    return logo[key] === value;
  });
}

/* Global route */
app.get('/*', (req,res,next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

/* Search logos */
app.get('/?', (req, res) => {
  let logos = searchLogos(req.query.query);
  res.json(logos);
});

/* Get logo */
app.get('/:logo', (req, res, next) => {
  const logo = getLogo('shortname', req.params.logo);
  if (logo) {
    const logoFilename = logo.files[0];
    const logoFile = path.join(PATH_LOGOS, logoFilename);
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
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json(err.message);
});

app.listen(PORT, () => {
  console.log("Logos API listening on port %d.", PORT);
});
