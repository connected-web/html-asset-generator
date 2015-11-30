var clean = require('./lib/path/clean');
var host = require('./lib/host');
var generate = require('./lib/generate');

clean('build/images')
    .then(host)
    .then(generate)
    .then(reportSuccess)
    .catch(reportFailiure);

function reportSuccess() {
    console.log('Completed work OK');
    console.log('Report available at ' + global.renderServerUrl);
}

function reportFailiure(ex) {
    console.log(ex);
    console.log('Stacktrace', ex.stack);
    console.log('Failed to complete work');
    process.exit(1);
}