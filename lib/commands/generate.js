const clean = require('promise-path').clean
const host = require('../server/host')
const processInstructions = require('../instructions/process')

function generate () {
  return optionalClean(global.outputPath)
    .then(host)
    .then(processInstructions)
    .then(countWorkItems)
    .then(reportSuccess)
    .catch(reportFailiure)
}

function optionalClean (path) {
  return (global.clean) ? clean(path) : Promise.resolve()
}

function reportSuccess (count) {
  const message = `Completed work OK: ${count}, instructions total`
  setTimeout(closeServer, 1)
  return message
}

function closeServer () {
  global.server.close()
}

function countWorkItems (work) {
  if (work) {
    return work.length
  }
  return Promise.reject(new Error('No work items found'))
}

function reportFailiure (ex) {
  global.serverLog(ex)
  if (ex.stack) {
    global.serverLog('Stacktrace', ex.stack)
  }
  global.serverLog('Failed to complete work')
  console.log('Fatal exception:', ex, ex.stack)
  process.exit(1)
}

module.exports = generate
