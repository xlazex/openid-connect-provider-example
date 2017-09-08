const Account = require('../model/account')

module.exports =
  {

    findById: Account.findById,

    // let's tell oidc-provider we also support the email scope, which will contain email and
    // email_verified claims
    claims: {
      // scope: [claims] format
      openid: ['sub'],
      email: ['email', 'email_verified'],
    },

    // let's tell oidc-provider where our own interactions will be
    // setting a nested route is just good practice so that users
    // don't run into weird issues with multiple interactions open
    // at a time.
    interactionUrl(ctx) {
      return `/interaction/${ctx.oidc.uuid}`;
    },
    features: {
      devInteractions: false,
      claimsParameter: true,
      clientCredentials: true,
      discovery: true,
      encryption: true,
      introspection: true,
      registration: true,
      request: true,
      requestUri: true,
      revocation: true,
    },
  }
