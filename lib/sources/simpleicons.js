const path = require('path');

/**
 * Retrieves dan leech's simple icons and augments them with proper
 * path and source properties.
 * https://github.com/danleech/simple-icons/
 */
module.exports = function(basePath) {
  const absPath = path.join(
    basePath,
    'simpleicons',
    'src',
    '/simple-icons.json'
  );

  const icons = require(absPath).icons;
  const logos = icons.map(logo => {
    const shortname = logo
      .title
      .toLowerCase()
      .replace(/[!|’|.| |-]/g, '')
      .replace(/[+]/, 'plus');

    return {
      shortname,
      name: logo.title,
      url: logo.source,
      path: path.join('simpleicons', 'icons', shortname + '.svg'),
    };
  });

  return Promise.resolve(logos);
};
