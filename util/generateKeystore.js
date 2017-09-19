const Provider = require('oidc-provider')
const keystore = Provider.createKeyStore()
const fs = require('fs')
const path = require('path')
//\ Import

const consolePrefix = 'OIDCP/generateKeystore: '
const JSON_DIR = 'json'
const JSON_FILE = 'keystore.json'

//TODO: move to util/pathOps
function checkDir( jsonDir = 'json' ){

  return new Promise(function(resolve, reject) {
    fs.exists(jsonDir, (exists) => {
      resolve(exists)
    })
  })

}

//TODO: move to util/pathOps
function createDir( jsonDir = 'json' ){

  return new Promise(function(resolve, reject) {
    fs.mkdir(jsonDir, (err) => {
      if(!!err){ reject(err) }
      resolve(true)
    })
  })

}

//TODO: move to util/pathOps
function writeDataToFile( jsonDir = '/json/', jsonFile = 'keystore.json', data = {} ){

  const jsonFilePath = path.join(__dirname, '..', jsonDir, jsonFile)

  console.log(`\n${consolePrefix}`, 'JSON filepath:', jsonFilePath)

  return new Promise(function(resolve, reject) {
    fs.writeFile(jsonFilePath, data, (err) => {
        if(!!err){ reject(err) }
        resolve({ status: true, file: jsonFilePath })
      })
  })

}

async function construct() {

  console.log(`${consolePrefix}`, 'Starting...')

  const progressTimer = (function() {
    const L = ["\\", "|", "/", "-"]
    const P = ["[__[]__]", "[_[__]_]", "[_[__]_]", "[__[]__]"]
    var x = 0
    return setInterval(function() {
      process.stdout.write(`\r${consolePrefix} Generating: ${P[x++]}`)
      x &= 3
    }, 250)
  })()

  // Generate keys
  await Promise.all([
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

  const isDirExists = await checkDir(JSON_DIR)
  if(!isDirExists){
    console.log(`\n${consolePrefix}`, 'JSON dir not exists. Creating..')
    const isDirCreated = await createDir(JSON_DIR)
    console.log(`${consolePrefix}`, `JSON dir ${ !isDirCreated ? 'not ' : ' ' }created.`)
  }

  console.log(`\n${consolePrefix}`, 'Writing keystore to file..')
  const keystoreJSON = JSON.stringify(keystore.toJSON(true), null, 2)
  const isDataWritten = await writeDataToFile( JSON_DIR, JSON_FILE, keystoreJSON )
  if(isDataWritten) {
    console.log(`${consolePrefix}`, 'All keys are saved..')
  } else {
    console.log(`${consolePrefix}`, 'Some problems with writing data to file..')
  }

  console.log(`${consolePrefix}`, 'Bye..')

}
//\ Declaration

module.exports = construct

// construct()
//   .catch(err => {
//     console.error(`\n${consolePrefix}`, 'Error: ', err);
//   })
//\ Execution
