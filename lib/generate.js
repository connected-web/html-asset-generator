var jsonRefs = require('json-refs');
var find = require('./path/find');
var renderInstruction = require('./render');

function generate() {
    var instructionsPath = __dirname + '/../instructions/*.json';
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
    var instructions = require(file);
    return jsonRefs.resolveRefs(instructions).then(function(result) {
        console.log(result.metadata);
        return processInstructions(result.resolved);
    });
}

function processInstructions(instructions) {
    var promises = instructions.map(renderInstruction);
    return Promise.all(promises);
}


module.exports = generate;