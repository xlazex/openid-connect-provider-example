const path = require('path')

module.exports = (app, oidc) => {
  app.set('trust proxy', true)
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname, 'views'))
}
