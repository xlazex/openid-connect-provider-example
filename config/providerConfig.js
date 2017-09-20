const Account = require('../model/account')
const pkg = require('../package.json')

module.exports =
  {

    findById: Account.findById,

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

    ttl: {
      AccessToken: 1 * 60 * 60, // 1 hour in seconds
      AuthorizationCode: 10 * 60, // 10 minutes in seconds
      ClientCredentials: 10 * 60, // 10 minutes in seconds
      IdToken: 1 * 60 * 60, // 1 hour in seconds
      RefreshToken: 1 * 24 * 60 * 60, // 1 day in seconds
    },

    acrValues: ['session', 'urn:mace:incommon:iap:bronze'], //WAT?!

    cookies: {
      long: { signed: true, maxAge: (1 * 24 * 60 * 60) * 1000 }, // 1 day in ms
      short: { signed: true },
    },

    discovery: {
      service_documentation: pkg.homepage,
      version: pkg.version,
    },

    claims: {
      amr: null,
      address: ['address'],
      email: ['email', 'email_verified'],
      phone: ['phone_number', 'phone_number_verified'],
      profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name',
        'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo'],
    },

  }
