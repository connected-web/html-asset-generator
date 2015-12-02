const expect = require('chai').expect;
const read = require('../../lib/path/read');
const stringify = require('./stringify');

function compare(path1, path2) {
    return Promise.all([
        read(path1).then(stringify),
        read(path2).then(stringify)
    ]).then(function(files) {
        expect(files[0]).to.equal(files[1]);
    });
}

module.exports = compare;
