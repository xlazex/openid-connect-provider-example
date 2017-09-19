const bodyParser = require('body-parser')
const parse = bodyParser.urlencoded({ extended: false })
const Account = require('../model/account')

module.exports = (app, oidc) => {

    app.get('/', async (req, res) => {
      res.render('index')
    })

    /**
     * Intreactions
     * TODO: description
     */
    app.get('/interaction/:grant', async (req, res) => {
      oidc.interactionDetails(req).then((details) => {
        console.log('see what else is available to you for interaction views', details);

        const view = (() => {
          switch (details.interaction.reason) {
            case 'consent_prompt':
            case 'client_not_authorized':
            return 'interaction'
            default:
            return 'login'
          }
        })()

        res.render(view, { details })
      })
    })

    app.post('/interaction/:grant/confirm', parse, (req, res) => {
      oidc.interactionFinished(req, res, {
        consent: {},
      })
    })

    app.post('/interaction/:grant/login', parse, (req, res, next) => {
      Account.authenticate(req.body.email, req.body.password).then((account) => {
        oidc.interactionFinished(req, res, {
          login: {
            account: account.accountId,
            acr: '1',
            remember: !!req.body.remember,
            ts: Math.floor(Date.now() / 1000),
          },
          consent: {
            // TODO: remove offline_access from scopes if remember is not checked
          },
        });
      }).catch(next)
    })
    // \interactions


    // USE
    // require("./some_new_routes_file.js")(app)

}
