var write = require('../path/write');
var request = require('request');

function render(instruction, dataUrl) {

    return new Promise(function(accept, reject) {

        var file = global.outputPath + '/' + instruction.asset;
        var serverUrl = global.renderServerUrl;
        var templateUrl = serverUrl + instruction.template;
        var renderer = instruction.renderer;
        var data = instruction.data;

        global.serverLog(`Rendering ${templateUrl} to ${file} using ${dataUrl}`);

        var requestOptions = {
            uri: templateUrl,
            headers: {
                'x-template-data-url': dataUrl
            }
        };

        request(requestOptions, function(err, response, body) {
            if (err) {
                global.serverLog('Text Render Request Error', err)
                reject(err);
            } else {
                write(file, body)
                    .then(accept)
                    .catch(reject);
            }
        });
    });
};

module.exports = render;
