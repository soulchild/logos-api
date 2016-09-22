const path = require('path');
const _ = require('lodash');

module.exports = function(basePath, options) {
  /*
    Load logos from all sources and
    augment every logo with full URL to image
  */
  const gilbarbara = require('./gilbarbara')(basePath);
  const simpleicons = require('./simpleicons')(basePath);
  const instantlogos = require('./instantlogos')(basePath);
  const all = _.union(
    gilbarbara(),
    simpleicons(),
    instantlogos()
  ).map(logo => Object.assign(logo, {
    logoURL: (options.baseURL || '') + '/' + logo.id
  }));

  /* Return logos matching conditions */
  function search(conditions = {}) {
    conditionKeys = Object.keys(conditions);
    if (conditionKeys.length === 0) return all;

    return all.filter(logo => {
      // All conditions must match
      return conditionKeys.filter(key => {
        const query = conditions[key].replace(/[.\-() ]/gi, '').toLowerCase();
        // Use substring matching
        return logo[key].indexOf(query) > -1;
      }).length === conditionKeys.length;
    });
  }

  /* Return logo matching id */
  const findById = (id) => all
    .find(logo => logo.id === id);

  return {
    search,
    findById,
    all
  };
};
