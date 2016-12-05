const assert = require('assert');
const path = require('path');
const logos = require('../lib/logos');
const LogosAPI = require('../lib/api');

const logosPath = path.resolve(__dirname, '../logos');

describe('logos', function() {
  let api;

  before('initialize logos', () => {
    return logos.init(logosPath)
      .then(logosAPI => api = logosAPI);
  });

  it('returns a LogosAPI object', () => {
    assert(api instanceof LogosAPI);
  });

  it('returns all logos', () => {
    assert(api.getAll() instanceof Array);
  });
});
