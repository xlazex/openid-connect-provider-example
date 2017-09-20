const RedisAdapter = require('../adapter/redisAdapter')
const MongoAdapter = require('../adapter/mongoAdapter')


module.exports =
  {
    clients: [
      {
        client_id: 'foo',
        redirect_uris: ['https://example.com'],
        response_types: ['id_token token'],
        grant_types: ['implicit'],
        token_endpoint_auth_method: 'none',
      },
      {
        client_id: 'bar',
        redirect_uris: ['https://example.com'],
        response_types: ['code'],
        grant_types: ['authorization_code'],
        token_endpoint_auth_method: 'none',
      },
      {
        client_id: 'foobar',
        client_secret: '123',
        grant_types: ['refresh_token', 'authorization_code'],
        redirect_uris: ['http://example.com/7/open_id', 'http://example.com/8/open_id'],
      }
    ],
    adapter: RedisAdapter,
  }
