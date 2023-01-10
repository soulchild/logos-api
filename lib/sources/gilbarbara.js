'use strict';

const path = require('path');

function parseLogos(json) {
  return Object.keys(json).map((key) => {
    const logo = json[key];
    return {
      name: logo.name,
      shortname: logo.shortname,
      url: logo.url,
      path: path.join('gilbarbara', 'logos', logo.files[0]),
    };
  });
}

module.exports = (basePath) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const items = require(path.resolve(basePath, 'gilbarbara', 'logos.json'));
  return Promise.resolve(parseLogos(items));
};
