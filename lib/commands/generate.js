var clean = require('../path/clean');
var host = require('../server/host');
var generate = require('../instructions/process');

function cleanHostAndGenerate() {
    return clean(global.outputPath)
        .then(host)
        .then(generate)
        .then(countWorkItems)
        .then(reportSuccess)
        .catch(reportFailiure);
}

function reportSuccess(count) {
    const message = `Completed work OK: ${count}, instructions total\nReport available at ${global.renderServerUrl}`;
    return message;
}

function countWorkItems(work) {
    var count = 0;
    work.forEach((item) => count += item.length);
    return count;
}

function reportFailiure(ex) {
    global.serverLog(ex);
    global.serverLog('Stacktrace', ex.stack);
    global.serverLog('Failed to complete work');
    process.exit(1);
}

module.exports = cleanHostAndGenerate;
