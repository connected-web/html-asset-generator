var defaultOptions = require('./lib/defaultOptions');
var generate = require('./lib/commands/generate');
var initialise = require('./lib/commands/initialise');

function configure(options) {

    options = options || {};

    Object.keys(defaultOptions).forEach(function(key) {
        global[key] = options[key] || defaultOptions[key];
    });

    return {
        generate: generate,
        init: initialise,
        defaultOptions: defaultOptions
    }
}

module.exports = configure;
