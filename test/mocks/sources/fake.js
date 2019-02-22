module.exports = () => {
  return Promise.resolve([
    {
      name: 'ACME Corp.',
      shortname: 'acme',
      url: 'https://www.example.com/',
      path: 'fake/acme.svg'
    },
    {
      name: 'FooBar Corp.',
      shortname: 'foobar',
      url: 'https://foobar.example.com/',
      path: 'fake/acme.svg'
    }
  ]);
};
