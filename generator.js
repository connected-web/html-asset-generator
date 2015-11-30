var clean = require('./lib/path/clean');
var host = require('./lib/host');
var generate = require('./lib/generate');

var argv = require('yargs')
    .default('p', 12020)
    .describe('p', 'Port number for local template server')
    .default('t', 'templates')
    .describe('t', 'Template directory')
    .default('o', 'build')
    .describe('o', 'Output directory for assets')
    .default('i', 'instructions')
    .describe('i', 'Instructions directory')
    .help('h')
    .alias('h', 'help')
    .epilogue('HAG is available on an ISC License, created by John Beech aka Markavian, 2015')
    .argv;

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
