const expect = require('chai').expect;
const clean = require('promise-path').clean;
const stringify = require('./helpers/stringify');
const complete = require('./helpers/complete');
const compare = require('./helpers/compare');
const testOptions = require('./helpers/testOptions');
const hag = require('../generator.js');

describe('API.generate', function() {

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
            .then(function(message) {
                expect(message).to.equal('Completed work OK: 2, instructions total');
            })
            .then(function() {
                return Promise.all([
                    compare('temp/b/example-text-asset.md', 'test/fixtures/expected-text-asset.md')
                ]);
            })
            .then(complete(done))
            .catch(done);
    });
});
