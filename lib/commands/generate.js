var clean = require('../path/clean');
var host = require('../server/host');
var generate = require('../instructions/process');

function cleanHostAndGenerate() {
    return clean(global.outputPath)
        .then(host)
        .then(generate)
        .then(reportSuccess)
        .catch(reportFailiure);
}

function reportSuccess(work) {
    console.log('Completed work OK:', work.length, 'instructions total');
    console.log('Report available at ' + global.renderServerUrl);
}

function reportFailiure(ex) {
    console.log(ex);
    console.log('Stacktrace', ex.stack);
    console.log('Failed to complete work');
    process.exit(1);
}

module.exports = cleanHostAndGenerate;
