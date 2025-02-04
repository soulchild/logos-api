// @ts-check

'use strict';

const { readdirSync } = require('node:fs');
const path = require('node:path');

/**
 * Retrieves the instantlogos collection and augments them with proper
 * path and source properties.
 * https://github.com/kogg/instant-logos
 */
module.exports = (basePath) => {
  const absPath = path.join(basePath, 'instantlogos', 'logos');
  return readdirSync(absPath)
    .filter((file) => file.match(/\.svg$/))
    .map((file) => {
      const fileParts = file.split('.');
      const name =
        fileParts.length < 2
          ? file
          : fileParts.slice(0, fileParts.length - 1).join('.');
      const shortname = name
        .toLowerCase()
        .replace(/[!|’|.| |-]/g, '')
        .replace(/[+]/, 'plus');

      return {
        shortname,
        name,
        url: 'http://instantlogosearch.com',
        path: path.join('instantlogos', 'logos', file),
      };
    });
};
