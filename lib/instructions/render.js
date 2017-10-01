const key = require('../template/key')
const requestCache = require('../template/cache')
const renderers = {
  webshot: require('../renderer/webshot'),
  text: require('../renderer/text'),
  json: require('../renderer/json')
}

function render (instruction) {
  const render = renderers[instruction.renderer.type]
  const dataUrl = createDataUrl(instruction)

  if (render) {
    return render(instruction, dataUrl)
  }

  return Promise.reject(new Error({
    error: 'No renderer found',
    instruction: instruction
  }))
}

function createDataUrl (instruction) {
  const dataKey = instruction.template + '/' + key.create(instruction.data) + '/data'
  requestCache.store(dataKey, instruction)

  return dataKey
}

module.exports = render
