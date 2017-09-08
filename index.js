const assert = require('assert')
const path = require('path')
const express = require('express')
const Provider = require('oidc-provider')

const PORT = 8443
const APP_NAME = 'login'

const mainConfig = require('./config/mainConfig')

const providerConfig = require('./config/providerConfig')

const keystore = Provider.createKeyStore();

const providerSettings = require('./config/providerSettings')

async function main() {

    const sig = await Promise.all([
                  keystore.generate('RSA', 2048, {
                    kid: 'sig-rs-0',
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
                  keystore.generate('EC', 'P-256', {
                    kid: 'enc-ec2-0',
                    use: 'enc',
                  }),
                  keystore.generate('EC', 'P-384', {
                    kid: 'sig-ec3-0',
                    use: 'sig',
                  }),
                  keystore.generate('EC', 'P-384', {
                    kid: 'enc-ec3-0',
                    use: 'enc',
                  }),
                  keystore.generate('EC', 'P-521', {
                    kid: 'sig-ec5-0',
                    use: 'sig',
                  }),
                  keystore.generate('EC', 'P-521', {
                    kid: 'enc-ec5-0',
                    use: 'enc',
                  })
                ])

    providerConfig.keystore = keystore.toJSON()

    console.log('checking keystore', providerConfig.keystore)

    const oidc = new Provider(mainConfig.providerHost, providerConfig)

    await oidc.initialize(providerSettings)

    oidc.app.proxy = true
    oidc.app.keys = process.env.SECURE_KEY.split(',')

    const app = express()
    app.set('trust proxy', true)
    app.set('view engine', 'ejs')
    app.set('views', path.resolve(__dirname, 'views'))

    require('./route')(app, oidc)

    //use provider's routes (koa)
    app.use(oidc.callback)

    app.listen(mainConfig.appPort)

}

main()
  .catch(err => {
    console.error(err);
    const status = err.status ? err.status : 500
    const message = err.message ? err.message : err
    res.status(status)
    res.send({status: status, message: message})
  })
