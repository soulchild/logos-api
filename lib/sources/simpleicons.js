'use strict';

const path = require('path');

/**
 * Retrieves dan leech's simple icons and augments them with proper
 * path and source properties.
 * https://github.com/danleech/simple-icons/
 */
module.exports = basePath => {
  const absPath = path.join(
    basePath,
    'simpleicons',
    '_data',
    'simple-icons.json'
  );

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const { icons } = require(absPath);
  const logos = icons.map(logo => {
    const title = logo.title.toLowerCase();
    const filename = title
      .replace(/[!|’| |-]/g, '')
      .replace(/\./, '-dot-')
      .replace(/[+]/, 'plus');
    const shortname = title.replace(/[!|’|.| |-]/g, '').replace(/[+]/, 'plus');
    return {
      shortname,
      name: logo.title,
      url: logo.source,
      path: path.join('simpleicons', 'icons', `${filename}.svg`)
    };
  });

  return Promise.resolve(logos);
};
