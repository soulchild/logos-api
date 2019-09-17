'use strict';

const assert = require('assert');
const path = require('path');
const logos = require('../lib/logos');
const LogosAPI = require('../lib/api');

const logosPath = path.resolve(__dirname, '../logos');
const fakeSourcesPath = path.resolve(__dirname, 'mocks', 'sources');

describe('logos', () => {
  let api;

  before('initialize logos', () => {
    // Initialize logos with fake logo module
    return logos
      .init(logosPath, {
        sourcesPath: fakeSourcesPath
      })
      .then(logosAPI => {
        api = logosAPI;
      });
  });

  it('returns a LogosAPI object', () => {
    assert(api instanceof LogosAPI);
  });

  it('correctly returns all logos', () => {
    assert.deepStrictEqual(api.getAll(), [
      {
        name: 'ACME Corp.',
        shortname: 'acme',
        url: 'https://www.example.com/',
        id: 'fake-acme',
        source: 'fake',
        path: 'fake/acme.svg'
      },
      {
        name: 'FooBar Corp.',
        shortname: 'foobar',
        url: 'https://foobar.example.com/',
        id: 'fake-foobar',
        source: 'fake',
        path: 'fake/acme.svg'
      }
    ]);
  });
});
