const assert = require('assert')
const express = require('express')
const Provider = require('oidc-provider')
// \Import


// init and run
async function construct() {

    // if (!process.env.HEROKU_APP_NAME && process.env.X_HEROKU_REMOTE) {
    //   process.env.X_HEROKU_REMOTE.match(/\.com\/(.+)\.git/);
    //   process.env.HEROKU_APP_NAME = RegExp.$1;
    // }
    //
    // assert(process.env.HEROKU_APP_NAME, 'process.env.HEROKU_APP_NAME missing');
    // assert(process.env.PORT, 'process.env.PORT missing');
    // assert(process.env.SECURE_KEY, 'process.env.SECURE_KEY missing, run `heroku addons:create securekey`');
    // assert.equal(process.env.SECURE_KEY.split(',').length, 2, 'process.env.SECURE_KEY format invalid');

    const mainConfig = require('./config/mainConfig')
    const providerConfig = require('./config/providerConfig')
    const providerSettings = require('./config/providerSettings')
    const keystore = Provider.createKeyStore()
    const app = express()

    await Promise.all([ //@updates: keystore
      keystore.generate('RSA', 2048, {
        alg: 'RS256',
        kid: 'signing-key',
        use: 'sig',
      }),
      keystore.generate('RSA', 2048, {
        kid: 'enc-rs-0',
        use: 'enc',
      }),
      keystore.generate('EC', 'P-256', {
        kid: 'sig-ec2-0',
        use: 'sig',
      }),
      // keystore.generate('EC', 'P-256', {
      //   kid: 'enc-ec2-0',
      //   use: 'enc',
      // }),
      // keystore.generate('EC', 'P-384', {
      //   kid: 'sig-ec3-0',
      //   use: 'sig',
      // }),
      // keystore.generate('EC', 'P-384', {
      //   kid: 'enc-ec3-0',
      //   use: 'enc',
      // }),
      // keystore.generate('EC', 'P-521', {
      //   kid: 'sig-ec5-0',
      //   use: 'sig',
      // }),
      // keystore.generate('EC', 'P-521', {
      //   kid: 'enc-ec5-0',
      //   use: 'enc',
      // })
    ])

    providerConfig.keystore = keystore.toJSON(true)

    const oidc = new Provider(mainConfig.providerHost, providerConfig)

    await oidc.initialize(providerSettings)

    require('./boot')(app, oidc)

    require('./route')(app, oidc)

    //use @oidc-provider's routes (koa)
    app.use(oidc.callback)

    app.listen(mainConfig.appPort)

}

construct()
  .catch(err => {
    console.error(err);
    const status = err.status ? err.status : 500
    const message = err.message ? err.message : err
    res.status(status)
    res.send({status: status, message: message})
  })
