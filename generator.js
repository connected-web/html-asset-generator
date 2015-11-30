var cli = require('./lib/cli');
var generate = require('./lib/commands/generate.js');
var initialise = require('./lib/commands/initialise.js');

global.port = cli.p;
global.templatesPath = cli.t;
global.outputPath = cli.o;
global.instructionsPath = cli.i;
global.dataPath = process.cwd() + 'data';
global.activeCommand = cli._[0];

console.log('Active command:', global.activeCommand);
var commands = {
    generate: generate,
    init: initialise,
    initialise: initialise
};

var command = commands[global.activeCommand];
if (command) {
    command();
} else {
    console.error('Unrecognised command', global.activeCommand);
    console.log('Use --help to view instructions');
    process.exit(1);
}
