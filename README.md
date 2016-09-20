# Logos API

> Simple Node.js application providing a RESTful API for searching and retrieving
> logos from various user-contributed sources.

## Live demo

Check out a running installation on Heroku:

- [Search for Google](http://logos-api.funkreich.de/?q=google)
- [Get Github logo](http://logos-api.funkreich.de/github)
- [Get Soundcloud logo](http://logos-api.funkreich.de/soundcloud)

## Logo sources

  * [Gilbarbara's SVG logos](https://github.com/gilbarbara/logos)
  * [Dan Leech's Simple Icons](https://github.com/danleech/simple-icons)

## Installation

```bash
npm install
npm start
```

## Examples

### Search

- http://localhost:8000/?q=gitlab
- http://localhost:8000/?q=soundcloud

### Get logo by id

- http://localhost:8000/gitlab
- http://localhost:8000/soundcloud

## Updating the logos

I deliberately didn't use the readily available [instant-logos](https://github.com/kogg/instant-logos) module, because the dependency chain was insane. Plus, the [napa](https://www.npmjs.com/package/napa)-based downloading of 3rd-party logos didn't work for me out-of-the-box. I took the approach of least resistance and currently just clone gilbarbara's Github repository during npm installation. To update the downloaded logos, just run `npm run update-logos`.

## Thank you

Many thanks to [gilbarbara](https://github.com/gilbarbara) for compiling/creating the logos!

## Authors

- [Tobias Kremer](https://github.com/soulchild)
