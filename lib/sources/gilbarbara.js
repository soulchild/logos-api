'use strict';

const path = require('node:path');
const { readFile } = require('node:fs/promises');

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

module.exports = async (basePath) => {
  const absPath = path.resolve(basePath, 'gilbarbara', 'logos.json');
  const icons = JSON.parse(await readFile(absPath));
  return Promise.resolve(parseLogos(icons));
};
