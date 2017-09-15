# OpenID Connect 1.0 Provider Skeleton Example

## Basic Info

### Usage

#### Heroku
1. Heroku: Config Variables
  * ``APP_NAME = irogov``
  * ``RUN_ENV = heroku``
* Create `./json/keystore.json` with `rw` permissions
* ...

#### Others
* Entry point: ``index.js``
* Using Nodemon: ``SECURE_KEY=your_secure_key_pair APP_NAME=yourHost RUN_ENV=local nodemon index.js``

### Based on
* [Filip Skokan](https://github.com/panva)'s [OpenID Connect Provider](https://github.com/panva/node-oidc-provider)
  * [Cisco Systems](https://github.com/cisco)' [node-jose](https://github.com/cisco/node-jose)
  * [OpenID Connect Specifications](http://openid.net/connect/): [Core](http://openid.net/specs/openid-connect-core-1_0.html), [Discovery](http://openid.net/specs/openid-connect-discovery-1_0.html)
  * [Koa](http://koajs.com/)
* [Filip Skokan](https://github.com/panva)'s [OpenID Connect Step-to-Step Examples](https://github.com/panva/node-oidc-provider-example)
* [Express 4](http://expressjs.com/)

### Dependencies
* NodeJS version >= 8.0.0 (ES6 & Little bit Of ES2017 used)
* List of node_modules at [package.json](https://github.com/xlazex/openid-connect-provider-example/blob/master/package.json) ``dependencies``

## TODO

### Tests!
* ...

### Keys
* key management
* ...
