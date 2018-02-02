var defaultOptions = require('./lib/defaultOptions')
var generate = require('./lib/commands/generate')
var init = require('./lib/commands/initialise')
var host = require('./lib/server/host')

function configure (options) {
  options = options || {}

  Object.keys(defaultOptions).forEach(function (key) {
    global[key] = options[key] || defaultOptions[key]
  })

  return {
    generate,
    init,
    host,
    defaultOptions
  }
}

module.exports = configure
