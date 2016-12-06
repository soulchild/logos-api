const _ = require('lodash');
const path = require('path');
const LogosAPI = require('./api');

const SOURCES = [
  'gilbarbara',
  'simpleicons',
  'instantlogos'
];
const sourcesDir = path.join(__dirname, 'sources');

function init(basePath) {
  // Process all logo sources
  const sources = SOURCES.map(source => {
    console.info('Loading source ' + source);
    return require(path.resolve(sourcesDir, source))(basePath);
  });
  return Promise.all(sources)
    .then(_.flatten)
    .then(logos => logos.map(logo => {
      return Object.assign(logo, {
        id: logo.source + '-' + logo.shortname
      });
    }))
    .then(logos => new LogosAPI(logos));
}

module.exports = { init };
