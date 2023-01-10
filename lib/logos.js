// @ts-check

'use strict';

const path = require('path');
const fs = require('fs/promises');
const LogosAPI = require('./api');

const augmentLogo = (source, logo) => ({
  ...logo,
  source,
  id: `${source}-${logo.shortname}`,
});

async function init(basePath, options = {}) {
  const sourcesPath = options.sourcesPath || path.join(__dirname, 'sources');
  const sourceModules = (await fs.readdir(sourcesPath)).map((source) =>
    path.basename(source, '.js')
  );

  // Require all logo source modules,
  // augment objects with necessary additional properties
  // and return an initialized LogosAPI object
  const sources = await Promise.all(
    sourceModules.map((source) => {
      const sourceModule = path.resolve(sourcesPath, `${source}.js`);
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(sourceModule)(basePath);
    })
  );

  const augmentedLogos = (
    await Promise.all(
      sources.map((logos, index) => {
        const source = sourceModules[index];
        return logos.map((logo) => augmentLogo(source, logo));
      })
    )
  ).flat();

  return new LogosAPI(augmentedLogos);
}

module.exports = { init };
