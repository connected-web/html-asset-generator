var webshot = require('webshot');

function render(instruction, dataUrl) {

    return new Promise(function(accept, reject) {

        var file = 'build/' + instruction.asset;
        var serverUrl = global.renderServerUrl;
        var templateUrl = serverUrl + instruction.template;
        var renderer = instruction.renderer;
        var data = instruction.data;

        console.log(`Rendering ${templateUrl} to ${file} using ${dataUrl}`);

        var webshotOptions = {
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
        };

        webshot(templateUrl, file, webshotOptions, function(err) {
            if (err) {
                console.log('Webshot Error', err)
                reject(err);
            } else {
                accept(instruction);
            }
        });
    });
};

module.exports = render;
