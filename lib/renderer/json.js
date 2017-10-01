const write = require('promise-path').write

function render (instruction, dataUrl) {
  const file = global.outputPath + '/' + instruction.asset
  const renderer = instruction.renderer
  const data = instruction.data

  global.serverLog(`Rendering data direct to ${file}`)

  const body = JSON.stringify(data, null, renderer.spacing || '  ')

  return write(file, body)
};

module.exports = render
