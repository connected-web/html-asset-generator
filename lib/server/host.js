const path = require('path')
const express = require('express')
const handlebars = require('handlebars')
const read = require('promise-path').read
const requestCache = require('../template/cache')
const key = require('../template/key')
const favicon = require('express-favicon')
const jsonRefs = require('json-refs')

handlebars.registerHelper('json', function (object, options) {
  return new handlebars.SafeString(JSON.stringify(object, null, options.spacing || '  ') || 'null')
})

function host () {
  const app = express()

  const port = global.port
  const faviconPath = path.join(__dirname, '../../favicon.ico')

  app.use(favicon(faviconPath))
  app.use('/data', express.static(process.cwd() + '/' + global.dataPath + '/'))
  app.use('/output', express.static(process.cwd() + '/' + global.outputPath + '/'))
  app.use('/templates', express.static(process.cwd() + '/' + global.templatesPath + '/'))
  app.use('/instructions', express.static(process.cwd() + '/' + global.instructionsPath + '/'))
  app.get('/', renderIndex)
  app.use('/*', checkCache)
  app.get('/*', extractDataFromRequest, renderTemplate)

  return new Promise(function (resolve, reject) {
    const server = app.listen(port, function (err) {
      if (err) {
        reject(err)
      } else {
        const port = server.address().port

        const serverUrl = `http://localhost:${port}`
        global.serverLog(`Render server running at ${serverUrl}`)
        global.renderServerUrl = serverUrl
        resolve(serverUrl)
      }
    })
    global.server = server
  })
}

function renderIndex (req, res) {
  const urls = requestCache.list()
  renderTemplateHelper(req, res, false, path.join(__dirname, '../../fixtures/html/index.hbs'), {
    title: 'Rendered Pages',
    urls: urls
  })
}

function checkCache (req, res, next) {
  const requestKey = req.originalUrl
  const existingRequest = requestCache.read(requestKey)
  if (existingRequest) {
    global.serverLog('Served', requestKey, 'from cache')
    res.send(existingRequest)
  } else {
    next()
  }
}

function storeInCache (requestKey, value) {
  requestCache.store(requestKey, value)
}

function renderTemplate (req, res) {
  const requestUrl = req.originalUrl
  const templatePath = global.templatesPath + requestUrl
  const instructionData = req.extractedData
  const requestKey = requestUrl + '/' + key.create(instructionData)

  const existingRequest = requestCache.read(requestKey)
  if (existingRequest) {
    res.send(existingRequest)
  } else {
    renderTemplateHelper(req, res, requestKey, templatePath, instructionData)
  };
}

function renderTemplateHelper (req, res, requestKey, templatePath, instructionData) {
  return read(templatePath)
    .then(stringify)
    .then(handlebars.compile)
    .then(function (template) {
      const body = template(instructionData)
      res.send(body)
      global.serverLog('Served', templatePath, 'with data', instructionData)

      if (requestKey) {
        storeInCache(requestKey, body)
      }
    }).catch(function (ex) {
      global.serverLog('Template unavailable', req.originalUrl, `Tried fallback: ${templatePath}`)
      res.status(500).send('Template unavailable: ' + templatePath)
    })
}

function stringify (value) {
  return value.toString()
}

function extractDataFromRequest (req, res, next) {
  const stringDataUrl = req.headers['x-template-data-url']

  const cachedRequest = requestCache.read(stringDataUrl)
  const data = (cachedRequest) ? (cachedRequest.data || {}) : {}

  jsonRefs.resolveRefs(data)
    .then(function (result) {
      req.extractedData = result.resolved
      next()
    })
}

module.exports = host
