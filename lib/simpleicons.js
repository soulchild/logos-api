const _ = require('lodash');
const path = require('path');

/**
 * Retrieves dan leech's simple icons and augments them with proper
 * path and source properties.
 * https://github.com/danleech/simple-icons/
 */
module.exports = function(basePath) {
  return _.memoize(function() {
    const absPath = path.join(basePath, 'simpleicons', 'src', '/simple-icons.json')

    const logos = require(absPath).icons;
    return logos.map(logo => {
      const shortname = logo
        .title
        .toLowerCase()
        .replace(/[!|’|.| |-]/g, '')
        .replace(/[+]/, 'plus');

      return {
        id: 'simpleicons-' + shortname,
        shortname,
        name: logo.title,
        url: logo.source,
        path: path.join('simpleicons', 'icons', shortname + '.svg'),
        source: 'simpleicons',
      }
    });
  });
};
