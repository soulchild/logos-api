'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');

/**
 * Retrieves the instantlogos collection and augments them with proper
 * path and source properties.
 * https://github.com/kogg/instant-logos
 */
module.exports = function(basePath) {
  const absPath = path.join(basePath, 'instantlogos', 'logos');
  const logos = _.chain(fs.readdirSync(absPath))
    .filter(file => file.match(/\.svg$/))
    .map(file => {
      const fileParts = file.split('.');
      const name = fileParts.length < 2 ? file : _.initial(fileParts).join('.');
      const shortname = name
        .toLowerCase()
        .replace(/[!|’|.| |-]/g, '')
        .replace(/[+]/, 'plus');

      return {
        shortname,
        name,
        url: 'http://instantlogosearch.com',
        path: path.join('instantlogos', 'logos', file)
      };
    })
    .value();

  return Promise.resolve(logos);
};
