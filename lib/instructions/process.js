var jsonRefs = require('json-refs');
var find = require('../path/find');
var renderInstruction = require('./render');

function processInstructionsDirectory() {
    var instructionsPath = global.instructionsPath + '/**/*.json';
    return find(instructionsPath)
        .then(loadFiles);
}

function loadFiles(files) {
    var promises = files.map(function(file) {
        return loadInstructions(file);
    });

    return Promise.all(promises);
}

function loadInstructions(file) {
    var instructions = require(process.cwd() + '/' + file);
    return jsonRefs.resolveRefs(instructions).then(function(result) {
        return processInstructionsArray(result.resolved);
    });
}

function processInstructionsArray(instructions) {
    var promises = instructions.map(renderInstruction);
    return Promise.all(promises);
}


module.exports = processInstructionsDirectory;
