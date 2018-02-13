'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = function(basePath) {
  const absPath = path.join(basePath, 'gilbarbara', 'logos');
  const logos = _.chain(fs.readdirSync(absPath))
    .filter(file => file.match(/\.svg$/))
    .map(file => {
      const [, filename] = file.match(/(.+)\.svg$/);
      const name = filename.split(/[^a-zA-Z0-9]/).map(_.capitalize).join(' ');
      const shortname = name.toLowerCase()
        .replace(/[!|’|.| |-]/g, '');

      return {
        name,
        shortname,
        url: 'http://svgporn.com/',
        path: path.join('gilbarbara', 'logos', file)
      };
    })
    .value();

  return Promise.resolve(logos);
};
