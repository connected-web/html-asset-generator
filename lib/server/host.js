var express = require('express');
var handlebars = require('handlebars');
var read = require('promise-path').read;
var requestCache = require('../template/cache');
var key = require('../template/key');
var favicon = require('express-favicon');

function host() {
  var app = express();

  var port = global.port;

  app.use(favicon(__dirname + '/../../favicon.ico'));
  app.use('/data', express.static(process.cwd() + '/' + global.dataPath + '/'));
  app.use('/output', express.static(process.cwd() + '/' + global.outputPath + '/'));
  app.use('/templates', express.static(process.cwd() + '/' + global.templatesPath + '/'));
  app.use('/instructions', express.static(process.cwd() + '/' + global.instructionsPath + '/'));
  app.get('/', renderIndex);
  app.use('/*', checkCache);
  app.get('/*', renderTemplate);

  return new Promise(function(accept, reject) {
    var server = app.listen(port, function(err) {
      if (err) {
        reject(err)
      } else {
        var host = server.address().address;
        var port = server.address().port;

        var serverUrl = `http://localhost:${port}`;
        global.serverLog(`Render server running at ${serverUrl}`);
        global.renderServerUrl = serverUrl;
        accept(serverUrl);
      }
    });
    global.server = server;
  });
}

function renderIndex(req, res) {
  var urls = requestCache.list();
  renderTemplateHelper(req, res, false, __dirname + '/../../fixtures/html/index.hbs', {
    title: 'Rendered Pages',
    urls: urls
  });
}

function checkCache(req, res, next) {
  var requestKey = req.originalUrl;
  var existingRequest = requestCache.read(requestKey);
  if (existingRequest) {
    global.serverLog('Served', requestKey, 'from cache');
    res.send(existingRequest);
  } else {
    next();
  }
}

function storeInCache(requestKey, value) {
  requestCache.store(requestKey, value);
}

function renderTemplate(req, res) {
  var requestUrl = req.originalUrl;
  var templatePath = global.templatesPath + requestUrl;
  var instructionData = extractDataFrom(req);
  var requestKey = requestUrl + '/' + key.create(instructionData);

  var existingRequest = requestCache.read(requestKey);
  if (existingRequest) {
    res.send(existingRequest);
  } else {
    renderTemplateHelper(req, res, requestKey, templatePath, instructionData)
  };
}

function renderTemplateHelper(req, res, requestKey, templatePath, instructionData) {
  return read(templatePath)
    .then(stringify)
    .then(handlebars.compile)
    .then(function(template) {
      var body = template(instructionData);
      res.send(body);
      global.serverLog('Served', templatePath, 'with data', instructionData);

      if (requestKey) {
        storeInCache(requestKey, body);
      }
    }).catch(function(ex) {
      global.serverLog('Template unavailable', templatePath, ex);
      res.status(500).send('Template unavailable: ' + templatePath);
    });
}

function stringify(value) {
  return value.toString();
}

function extractDataFrom(request) {
  var stringDataUrl = request.headers['x-template-data-url'];

  var cachedRequest = requestCache.read(stringDataUrl);
  var data = (cachedRequest) ? (cachedRequest.data || {}) : {};

  return data;
}

module.exports = host;
