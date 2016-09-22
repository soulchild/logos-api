const _ = require('lodash');
const fs = require('fs');
const path = require('path');

/**
 * Retrieves the instantlogos collection and augments them with proper
 * path and source properties.
 * https://github.com/kogg/instant-logos
 */
module.exports = function(basePath) {
  return _.memoize(function() {
    const absPath = path.join(basePath, 'instantlogos', 'logos')
    return _.chain(fs.readdirSync(absPath))
      .filter(file => file.match(/\.svg$/))
    	.map(file => {
    		const file_parts = file.split('.');
    		var name = file_parts.length < 2 ? file : _.initial(file_parts).join('.');
        const shortname = name
          .toLowerCase()
          .replace(/[!|’|.| |-]/g, '')
          .replace(/[+]/, 'plus');

        return {
          id: 'instantlogos-' + shortname,
          shortname,
          name: name,
          url: 'http://instantlogosearch.com',
          path: path.join('instantlogos', 'logos', file),
          source: 'instantlogos',
        };
      })
      .value();
    });
};
