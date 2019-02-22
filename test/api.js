const assert = require('assert');
const LogosAPI = require('../lib/api');

const logosFixture = require('./fixtures/logos.json');

const api = new LogosAPI(logosFixture);

describe('api', () => {
  it('returns 500px logo by id', () => {
    const logo = api.findById('gilbarbara-500px');
    assert(logo instanceof Object);
    assert.equal(logo.name, '500px');
  });

  it('returns correct number of logos', () => {
    assert.equal(api.getAll().length, 4);
  });

  it('returns correct search results - 1 condition', () => {
    assert.equal(
      api.search({
        name: '500px'
      }).length,
      2
    );
  });

  it('returns correct search results - 2 conditions', () => {
    assert.equal(
      api.search({
        name: '500px',
        source: 'simpleicons'
      }).length,
      1
    );
  });

  it('returns correct search results w/ spaces', () => {
    assert.equal(
      api.search({
        name: 'Mercedes Benz'
      }).length,
      1
    );
  });
});
