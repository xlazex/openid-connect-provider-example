const assert = require('assert')
const express = require('express')
const Provider = require('oidc-provider')
// \Import

function checkDir( jsonDir = 'json' ){

  return new Promise(function(resolve, reject) {
    fs.exists(jsonDir, (exists) => {
      resolve(exists)
    })
  })

}

// init and run
async function construct() {

    assert(process.env.PORT, 'process.env.PORT missing');
    assert(process.env.SECURE_KEY, 'process.env.SECURE_KEY missing, run `heroku addons:create securekey`');
    assert.equal(process.env.SECURE_KEY.split(',').length, 2, 'process.env.SECURE_KEY format invalid');

    const mainConfig = require('./config/mainConfig')
    const providerConfig = require('./config/providerConfig')
    const providerSettings = require('./config/providerSettings')
    const app = express()

    console.log('check json dir', await checkDir())
    console.log('check json dir json/keystore.json', await checkDir('json/keystore.json'))
    console.log('check json dir /app/json/keystore.json', await checkDir('/app/json/keystore.json'))
    console.log('check json dir ./json/keystore.json', await checkDir('./json/keystore.json'))

    const ks = require('json/keystore.json');

    providerConfig.keystore = ks

    const oidc = new Provider(mainConfig.providerHost, providerConfig)

    await oidc.initialize(providerSettings)

    //use @application routes (express)
    require('./route')(app, oidc)

    //use @oidc-provider's routes (koa)
    app.use(oidc.callback)

    //configuring @application
    require('./boot')(app, oidc)

    app.listen(mainConfig.appPort, ()=>{
      console.log('Listening on port:', mainConfig.appPort)
    })

}

construct()
  .catch(err => {
    console.error(err);
    const status = err.status ? err.status : 500
    const message = err.message ? err.message : err
    res.status(status)
    res.send({status: status, message: message})
  })
