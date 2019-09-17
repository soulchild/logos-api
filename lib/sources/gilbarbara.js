'use strict';

const _ = require('lodash');
const path = require('path');

function parseLogos(json) {
  return Object.keys(json).map(key => {
    const logo = json[key];
    return _(logo)
      .pick(logo, ['name', 'shortname', 'url'])
      .assign({
        path: path.join('gilbarbara', 'logos', logo.files[0])
      })
      .value();
  });
}

module.exports = basePath => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const items = require(path.resolve(basePath, 'gilbarbara', 'logos.json'));
  return Promise.resolve(parseLogos(items));
};
