var clean = require('../path/clean');
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
    setTimeout(exit, 1);
    return message;
}

function exit() {
    process.exit(0);
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

module.exports = generate;
