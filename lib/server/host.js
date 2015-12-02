var express = require('express');
var handlebars = require('handlebars');
var read = require('../path/read');
var requestCache = require('../template/cache');
var key = require('../template/key');

function host() {
  var app = express();

  var port = global.port;

  app.use('/favicon.ico', express.static(__dirname + '/../favicon.ico'));
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
        console.log(`Render server running at ${serverUrl}`);
        global.renderServerUrl = serverUrl;
        accept(serverUrl);
      }
    });
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
    console.log('Served', requestKey, 'from cache');
    res.send(existingRequest);
  } else {
    next();
  }
}

function storeInCache(requestKey, value) {
  requestCache.store(requestKey, value);
  console.log('Registered', global.renderServerUrl + requestKey, ' as cached endpoint');
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
      console.log('Served', templatePath, 'with data', instructionData);

      if (requestKey) {
        storeInCache(requestKey, body);
      }
    }).catch(function(ex) {
      console.error('Template unavailable', templatePath, ex);
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