'use strict';

const request = require('supertest');
const path = require('path');
const assert = require('assert');
const App = require('../app');

const logosBasePath = path.resolve(__dirname, 'logos');
const sourcesPath = path.resolve(__dirname, 'mocks', 'sources');

describe('app', () => {
  let app;

  before('bootstrap', () =>
    App.bootstrap(logosBasePath, {
      sourcesPath,
    }).then((theApp) => {
      app = theApp;
    })
  );

  it('responds with json', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, /[{.+}]/, done);
  });

  it('responds with 404', (done) => {
    request(app).get('/foo').expect(404, done);
  });

  it('returns search result', (done) => {
    request(app)
      .get('/?q=acme')
      .expect((res) => {
        assert.deepStrictEqual(res.body, [
          {
            id: 'fake-acme',
            name: 'ACME Corp.',
            shortname: 'acme',
            url: 'https://www.example.com/',
            source: 'fake',
            logoURL: 'http://localhost:8000/logo/fake-acme',
          },
        ]);
      })
      .end(done);
  });

  it('returns svg logo', (done) => {
    request(app)
      .get('/logo/fake-acme')
      .expect('Content-Type', /svg/)
      .expect(200, done);
  });
});
