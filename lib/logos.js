const _ = require('lodash');
const path = require('path');
const LogosAPI = require('./api');

const SOURCES = ['gilbarbara', 'simpleicons', 'instantlogos'];
const sourceDir = path.join(__dirname, 'sources');

function init(basePath) {
  // Process all logo sources
  const sources = SOURCES.map(source =>
    require(path.resolve(sourceDir, source))(basePath)
  );
  return Promise.all(sources)
    .then(_.flatten)
    .then(logos => logos.map(logo =>
      Object.assign(logo, {
        id: logo.source + '-' + logo.shortname
      }))
    )
    .then(logos => new LogosAPI(logos));
}

module.exports = { init };
