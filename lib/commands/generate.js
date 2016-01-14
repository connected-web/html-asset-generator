var clean = require('promise-path').clean;
var host = require('../server/host');
var processInstruction = require('../instructions/process');

function generate() {
    return optionalClean(global.outputPath)
        .then(host)
        .then(processInstruction)
        .then(countWorkItems)
        .then(reportSuccess)
        .catch(reportFailiure);
}

function optionalClean(path) {
    return (global.clean) ? clean(path) : Promise.accept();
}

function reportSuccess(count) {
    const message = `Completed work OK: ${count}, instructions total`;
    setTimeout(closeServer, 1);
    return message;
}

function closeServer() {
    global.server.close();
}

function countWorkItems(work) {
    return work.length;
}

function reportFailiure(ex) {
    global.serverLog(ex);
    global.serverLog('Stacktrace', ex.stack);
    global.serverLog('Failed to complete work');
    process.exit(1);
}

module.exports = generate;
