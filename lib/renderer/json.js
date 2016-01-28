var write = require('promise-path').write;
var request = require('request');

function render(instruction, dataUrl) {

  var file = global.outputPath + '/' + instruction.asset;
  var serverUrl = global.renderServerUrl;
  var renderer = instruction.renderer;
  var data = instruction.data;

  global.serverLog(`Rendering data direct to ${file}`);

  var body = JSON.stringify(data, null, renderer.spacing || '  ');

  return write(file, body);
};

module.exports = render;