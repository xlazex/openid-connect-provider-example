const Provider = require('oidc-provider')
const keystore = Provider.createKeyStore()
const fs = require('fs')
const path = require('path')

const consolePrefix = 'OIDCP/generateKeystore: '

const progressTimer = (function() {
  const L = ["\\", "|", "/", "-"]
  const P = ["[__[]__]", "[_[__]_]", "[_[__]_]", "[__[]__]"]
  var x = 0
  return setInterval(function() {
    process.stdout.write(`\r${consolePrefix} Generating: ${P[x++]}`)
    x &= 3
  }, 250)
})()

async function construct() {

  console.log(`${consolePrefix}`, 'Starting...')

  await Promise.all([ //@updates: keystore
    keystore.generate('RSA', 2048, {
      alg: 'RS256',
      kid: 'signing-key',
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

  clearInterval(progressTimer)

  console.log(`\n${consolePrefix}`, 'Keys generated: \n', keystore.all())

  // Kind of callback hell implementation
  fs.exists('json/keystore.json', (exists) => {
    if(!exists){
      console.log(`\n${consolePrefix}`, 'File not exists. Creating..')
    }
    fs.writeFile(path.resolve('json/keystore.json'), JSON.stringify(keystore.toJSON(true), null, 2), (err) => {
      if(!!err) {
        console.log(`\n${consolePrefix}`, 'Not saved \n', err)
      } else {
        console.log(`\n${consolePrefix}`, 'Saved to file: ', '\"json/keystore.json\"')
      }
      console.log(`${consolePrefix}`, 'Bye.')
    })
  })

}

construct()
  .catch(err => {
    console.error(`\n${consolePrefix}`, 'Error: ', err);
  })
