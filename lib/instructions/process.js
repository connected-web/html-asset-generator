var jsonRefs = require('json-refs');
var find = require('promise-path').find;
var fetch = require('promise-path').fetch;
var renderInstruction = require('./render');
var path = require('path');

function processInstructionsDirectory() {
    var instructionsPath = global.instructionsPath + '/**/*.json';
    return find(instructionsPath)
        .then(loadFiles);
}

function loadFiles(files) {
    var completedWork = [];
    var work = files.map(function(file) {
        var baseName = path.basename(file);
        return function(work) {
            (work) ? completedWork.push(work) : work;
            return loadInstructions(baseName);
        };
    });

    var promisedWork = work.reduce(function(current, next) {
        console.log('Current', current, 'Next', next);
        return current().then(next).catch(function(ex) {
            console.error('Error', ex, ex.stack);
            return next;
        });
    })
    return promisedWork().then(Promise.accept(completedWork));
}

function loadInstructions(file) {
    var localServerPath = global.renderServerUrl + '/instructions/' + file;
    global.serverLog('Fetching', localServerPath);
    return fetch(localServerPath)
        .then(function(body) {
            return body.replace(/\/data\//g, global.renderServerUrl + '/data/');
        })
        .then(JSON.parse)
        .then(jsonRefs.resolveRefs)
        .then(function(result) {
            return processInstructionsArray(result.resolved);
        });
}

function processInstructionsArray(instructions) {
    var promises = instructions.map(renderInstruction);
    return Promise.all(promises);
}


module.exports = processInstructionsDirectory;