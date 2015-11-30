var key = require('./template/key');
var requestCache = require('./template/cache');
var renderers = {
  webshot: require('./renderer/webshot')
};

function render(instruction) {
  var render = renderers[instruction.renderer.type];
  var dataUrl = createDataUrl(instruction);

  if (render) {
    return render(instruction, dataUrl);
  }

  return Promise.reject({
    error: 'No renderer found',
    instruction: instruction
  });
}

function createDataUrl(instruction) {
  var dataKey = instruction.template + '/' + key.create(instruction.data) + '/data';
  requestCache.store(dataKey, instruction);

  console.log('Registered', global.renderServerUrl + dataKey, ' as cached endpoint');

  return dataKey;
}

module.exports = render;
