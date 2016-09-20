const _ = require('lodash');
const path = require('path');

/**
 * Retrieves gilbarbara's logos and augments them with proper
 * path and source properties.
 */
module.exports = function(basePath) {
  return _.memoize(function() {
    const absPath = path.join(basePath, 'gilbarbara', 'app', '/logos.json');
    const logos = require(absPath).items;
    return logos.map(logo => {
      return _(logo)
        .pick(logo, ['key', 'name', 'shortname', 'url',
          'tags', 'categories', 'updated'
        ])
        .assign({
          path: path.join('gilbarbara', 'logos', logo.files[0]),
          source: 'gilbarbara',
        })
        .value();
    });
  });
};
