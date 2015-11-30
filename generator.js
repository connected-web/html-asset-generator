var clean = require('./lib/path/clean');
var host = require('./lib/host');
var generate = require('./lib/generate');
var cli = require('./lib/cli');

global.port = argv.p;
global.templatesPath = argv.t;
global.outputPath = argv.o;
global.instructionsPath = argv.i;

clean(global.outputPath)
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
