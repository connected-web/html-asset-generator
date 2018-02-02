var jsonRefs = require('json-refs')
var find = require('promise-path').find
var fetch = require('promise-path').fetch
var renderInstruction = require('./render')
var path = require('path')

function processInstructionsDirectory () {
  var instructionsFileMatcher = path.join(global.instructionsPath, global.instructionsGlob)
  return find(instructionsFileMatcher).then(checkFiles).then(loadFiles)
}

function checkFiles (files) {
  if (files && files.length > 0) {
    return files
  } else {
    return Promise.reject([
      'No instructions found',
      path.join(global.instructionsPath, global.instructionsGlob)
    ].join(', '))
  }
}

function loadFiles (files) {
  var completedWork = []

  var work = files.map(function (file) {
    var baseName = path.basename(file)
    return function () {
      return loadInstructions(baseName).then(function (work) {
        completedWork = [].concat(completedWork, work)
        return completedWork
      })
    }
  })

  var promisedWork = work.reduce(function (previous, next) {
    return Promise.resolve(previous).then(next).catch(function (ex) {
      console.error('Error', ex, ex.stack)
      return next
    })
  }, Promise.resolve())

  return Promise.resolve(promisedWork)
}

function loadInstructions (file) {
  var localServerPath = global.renderServerUrl + '/instructions/' + file
  global.serverLog('Fetching', localServerPath)
  return fetch(localServerPath).then(function (body) {
    return body.replace(/\/data\//g, global.renderServerUrl + '/data/')
  }).then(JSON.parse).then(jsonRefs.resolveRefs).then(function (result) {
    return processInstructionsArray(result.resolved)
  })
}

function processInstructionsArray (instructions) {
  var promises = instructions.map(renderInstruction)
  return Promise.all(promises)
}

module.exports = processInstructionsDirectory
