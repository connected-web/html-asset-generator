var defaultOptions = require('../lib/defaultOptions');

var argv = require('yargs')
    .usage('HTML Asset Generator (HAG)\nUsage: node generator <command> <args>')
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
    .describe('i', 'Instructions directory')
    .help('h', 'Help and Instructions')
    .alias('h', 'help')
    .epilogue('HAG is available on an ISC License, created by John Beech aka Markavian, 2015')
    .command('generate', 'Generate assets based on instructions and templates')
    .command('init', 'Create initial folders, templates, and instructions')
    .argv;

module.exports = argv;
