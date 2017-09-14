const path = require('path')

module.exports = (app, oidc) => {

  //OpenID Connect Provider
  oidc.app.proxy = true
  //oidc.app.keys = process.env.SECURE_KEY.split(',')

  //Application
  app.set('trust proxy', true)
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname, 'views'))
}
