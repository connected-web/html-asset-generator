const expect = require('chai').expect;
const clean = require('../lib/path/clean');
const stringify = require('./helpers/stringify');
const complete = require('./helpers/complete');
const compare = require('./helpers/compare');
const testOptions = require('./helpers/testOptions');
const hag = require('../generator.js');

describe('Generator', function() {

    beforeEach(function(done) {
        clean('temp').then(done);
    });

    afterEach(function(done) {
        clean('temp').then(done);
    })

    it('should generate the correct output based on instructions, templates and data', function(done) {
        const api = hag(testOptions);
        api.init()
            .then(api.generate)
            .then(function() {
                return Promise.all([
                    compare('temp/b/example-text-asset.md', 'test/fixtures/expected-text-asset.md')
                ]);
            })
            .then(complete(done))
            .catch(done);
    });
});
