const RedisAdapter = require('../adapter/redisAdapter');

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
    keys: [
      '2fi9ugflsiscwcdv3g2aq2v2c2nwam2elripnkjbn1s6n5m6c4',
      '6c7r6pz375bhltbvt57slj5waqj3fw1t7hc0u8bqwda0sqdth5'
    ]
  }
