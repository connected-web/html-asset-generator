const path = require('path')
const webshot = require('webshot')

function render (instruction, dataUrl) {
  return new Promise(function (resolve, reject) {
    const file = path.join(global.outputPath, instruction.asset)
    const serverUrl = global.renderServerUrl
    const templateUrl = serverUrl + instruction.template
    const renderer = instruction.renderer

    global.serverLog(`Rendering ${templateUrl} to ${file} using ${dataUrl}`)

    const webshotOptions = {
      screenSize: {
        width: renderer.size.width || 320,
        height: renderer.size.height || 480
      },
      shotSize: {
        width: renderer.size.width || 320,
        height: renderer.size.height || 480
      },
      customHeaders: {
        'x-template-data-url': dataUrl
      },
      errorIfStatusIsNot200: true,
      renderDelay: 100
    }

    webshot(templateUrl, file, webshotOptions, function (err) {
      if (err) {
        console.log('Webshot Error', err)
        reject(err)
      } else {
        resolve(instruction)
      }
    })
  })
};

module.exports = render
