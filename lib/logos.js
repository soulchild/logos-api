'use strict';

const _ = require('lodash');
const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');
const LogosAPI = require('./api');

function augmentLogo(source, logo) {
  return Object.assign(logo, {
    source,
    id: `${source}-${logo.shortname}`
  });
}

function init(basePath, options = {}) {
  const sourcesPath = options.sourcesPath || path.join(__dirname, 'sources');
  const sourceModules = fs
    .readdirSync(sourcesPath)
    .map(source => path.basename(source, '.js'));

  // Require all logo source modules,
  // augment objects with necessary additional properties
  // and return an initialized LogosAPI object
  const sources = sourceModules.map(source => {
    const sourceModule = path.resolve(sourcesPath, `${source}.js`);
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require(sourceModule)(basePath);
  });
  return Promise.mapSeries(sources, (logos, index) => {
    const source = sourceModules[index];
    return logos.map(logo => augmentLogo(source, logo));
  })
    .then(_.flatten)
    .then(logos => new LogosAPI(logos));
}

module.exports = { init };
