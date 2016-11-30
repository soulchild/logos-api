const _ = require('lodash');
const LogosAPI = require('./logos-api');

const SOURCES = ['gilbarbara', 'simpleicons', 'instantlogos'];

function addLogoProperties(logo, options) {
  const id = logo.source + '-' + logo.shortname;
  const logoURL = logo.logoURL || ((options.baseURL || '') + '/' + id);
  return Object.assign(logo, {
    id,
    logoURL
  });
}

function init(basePath, options = {}) {
  // Require and process all sources
  const sources = SOURCES.map(source => require('./sources/' + source)(basePath));
  return Promise.all(sources)
    .then(_.flatten)
    .then(logos => logos.map(logo => addLogoProperties(logo, options)))
    .then(logos => new LogosAPI(logos));
}

module.exports = { init };
