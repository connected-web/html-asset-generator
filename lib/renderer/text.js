const path = require('path')
const write = require('promise-path').write
const request = require('request')

function render (instruction, dataUrl) {
  return new Promise(function (resolve, reject) {
    const file = path.join(global.outputPath, instruction.asset)
    const serverUrl = global.renderServerUrl
    const templateUrl = serverUrl + instruction.template

    global.serverLog(`Rendering ${templateUrl} to ${file} using ${dataUrl}`)

    const requestOptions = {
      uri: templateUrl,
      headers: {
        'x-template-data-url': dataUrl
      }
    }

    request(requestOptions, function (err, response, body) {
      if (err) {
        global.serverLog('Text Render Request Error', err)
        reject(err)
      } else {
        write(file, body).then(resolve).catch(reject)
      }
    })
  })
};

module.exports = render
