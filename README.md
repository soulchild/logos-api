# Logos API

> Simple Node.js application providing a RESTful API for searching and retrieving
> logos from various user-contributed sources.

**NOTE:** This project is a work-in-progress and the API may change at any time.
It's main purpose is being the backend for my
[Sketch logo fetcher](https://github.com/soulchild/sketch-logo-fetcher) plugin.

## Live demo

Check out a running installation:

- [Search for Google](http://logos-api.funkreich.de/?q=google)
- [Get Soundcloud logo from Gilbarbara](http://logos-api.funkreich.de/gilbarbara-soundcloud)
- [Get Github logo from Simple Icons](http://logos-api.funkreich.de/simpleicons-github)

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

#### By name

- [http://localhost:8000/?q=gitlab](http://localhost:8000/?q=gitlab)

#### By name and source

- [http://localhost:8000/?q=soundcloud&source=simpleicons](http://localhost:8000/?q=soundcloud&source=simpleicons)

### Get logo

- [http://localhost:8000/gilbarbara-gitlab](http://localhost:8000/gilbarbara-gitlab)
- [http://localhost:8000/simpleicons-soundcloud](http://localhost:8000/simpleicons-soundcloud)

## Updating the logos

I deliberately didn't use the readily available [instant-logos](https://github.com/kogg/instant-logos) module, because the dependency chain was insane. Plus, the [napa](https://www.npmjs.com/package/napa)-based downloading of 3rd-party logos didn't work for me out-of-the-box. I took the approach of least resistance and currently just clone the source Github repositories during npm installation. To update the downloaded logos, just run `npm run update-logos`.

## Thank you

Kudos to all the [people doing the hard work](#logo-sources) of compiling and creating the logos!

Thanks to [DG-i](https://www.dg-i.net) for hosting the API.

## Authors

- [Tobias Kremer](https://github.com/soulchild)
