const _ = require('lodash');
const path = require('path');

// const request = require('request');
// const S3_BASE_URL = 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/';
// const LOGOS_JSON_URL = 'https://logos-c87b5.firebaseio.com/items.json';

function parseLogos(json) {
  return Object.keys(json).map(key => {
    const logo = json[key];
    return _(logo)
      .pick(logo, ['name', 'shortname', 'url'])
      .assign({
        source: 'gilbarbara',
        path: path.join('gilbarbara', 'logos', logo.files[0]),
//        logoURL: S3_BASE_URL + logo.files[0]
      })
      .value();
  });
}

module.exports = function(basePath) {
  const items = require(path.resolve(basePath, 'gilbarbara', 'items.json'));
  return Promise.resolve(parseLogos(items));
};

/**
 * Retrieves gilbarbara's logos and augments them with proper
 * path and source properties.
 */
// module.exports = function() {
//   return new Promise((resolve, reject) => {
//     request({
//       url: LOGOS_JSON_URL,
//       json: true
//     }, (err, response, body) => {
//       if (err) reject(err);
//       resolve(parseLogos(body));
//     });
//   });
// };
