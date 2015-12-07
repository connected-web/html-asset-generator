const expect = require('chai').expect;
const read = require('../../lib/path/read');
const stringify = require('./stringify');

function compare(actualPath, expectedPath) {
    return Promise.all([
        read(actualPath).then(stringify),
        read(expectedPath).then(stringify)
    ]).then(function(files) {
        expect(files[1]).to.equal(files[0]);
    });
}

module.exports = compare;
