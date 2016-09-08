var defaultOptions = require('../lib/defaultOptions');

var version = require(__dirname + '/../package.json').version;

var config = require('yargs')
    .usage(`HTML Asset Generator ${version} (HAG)\nUsage: node generator <command> <args>`)
    .default('p', defaultOptions.port)
    .alias('p', 'port')
    .describe('p', 'Port number for local template server')
    .default('t', defaultOptions.templatesPath)
    .alias('t', 'templatesPath')
    .describe('t', 'Template directory')
    .default('o', defaultOptions.outputPath)
    .alias('o', 'outputPath')
    .describe('o', 'Output directory for assets')
    .default('i', defaultOptions.instructionsPath)
    .alias('i', 'instructionsPath')
    .describe('i', 'Instructions matcher')
    .default('c', defaultOptions.clean)
    .alias('c', 'clean')
    .describe('c', 'Clean the output directory when generating assets')
    .help('h', 'Help and Instructions')
    .alias('h', 'help')
    .epilogue('HAG is available on an ISC License, created by John Beech aka Markavian, 2016')
    .command('generate [fileglob]', 'Generate assets based on instructions')
    .command('host', 'Host the asset server without processing instructions')
    .command('init', 'Create initial folders, templates, and instructions')
    .command('version', `Reports the current version (${version})`, function() {
        console.log(version);
        process.exit(0);
    })
    .example('hag init')
    .example('hag generate')
    .example('hag generate **/*.json')
    .example('hag host')
    .example('hag version');

module.exports = config;
