'use strict';

const fs = require('node:fs');
const path = require('node:path');

/**
 * Retrieves VectorLogoZone's logos
 * https://github.com/VectorLogoZone/vectorlogozone/
 */

module.exports = (basePath) => {
  const absPath = path.join(basePath, 'vectorlogozone', 'www', 'logos');

  const logos = [];
  const logodirs = fs
    .readdirSync(absPath)
    .filter((file) => fs.lstatSync(path.join(absPath, file)).isDirectory());
  logodirs.forEach((logodir) => {
    const logofiles = fs
      .readdirSync(path.join(absPath, logodir))
      .filter((file) => file.match(/\.svg$/));
    logofiles.forEach((file) => {
      const name = file.replace(/-[^-]*\.svg$/, '');
      const shortname = file
        .replace(/\.svg$/, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

      logos.push({
        shortname,
        name,
        url: `https://www.vectorlogo.zone/logos/${logodir}/index.html`,
        path: path.join('vectorlogozone', 'www', 'logos', logodir, file),
      });
    });
  });

  return Promise.resolve(logos);
};
