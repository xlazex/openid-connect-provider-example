const RedisAdapter = require('../adapter/redisAdapter')
const MongoAdapter = require('../adapter/mongoAdapter')


module.exports =
  {
    clients: [
      // reconfigured the foo client for the purpose of showing the adapter working
      {
        client_id: 'foo',
        redirect_uris: ['https://example.com'],
        response_types: ['id_token token'],
        grant_types: ['implicit'],
        token_endpoint_auth_method: 'none',
      },
    ],
    adapter: RedisAdapter,
  }
