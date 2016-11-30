const _ = require('lodash');
const LogosAPI = require('./logos-api');

function addLogoProperties(logo, options) {
  const id = logo.source + '-' + logo.shortname;
  const logoURL = logo.logoURL || ((options.baseURL || '') + '/' + id);
  return Object.assign(logo, {
    id,
    logoURL
  });
}

function init(basePath, options = {}) {
  const gilbarbara = require('./gilbarbara')(basePath);
  const simpleicons = require('./simpleicons')(basePath);
  const instantlogos = require('./instantlogos')(basePath);
  return Promise.all([
    gilbarbara,
    simpleicons,
    instantlogos
  ])
  .then(_.flatten)
  .then(logos => logos.map(logo => addLogoProperties(logo, options)))
  .then(logos => new LogosAPI(logos));
}

module.exports = { init };
