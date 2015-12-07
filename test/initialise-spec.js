const expect = require('chai').expect;
const clean = require('../lib/path/clean');
const read = require('../lib/path/read');
const complete = require('./helpers/complete');
const compare = require('./helpers/compare');
const testOptions = require('./helpers/testOptions');
const hag = require('../generator.js');

describe('API.init', function() {

    beforeEach(function(done) {
        clean('temp').then(done);
    });

    afterEach(function(done) {
        clean('temp').then(done);
    })

    it('should report the correct number of files created', function(done) {
        hag(testOptions).init()
            .then(function(result) {
                expect(result).to.deep.equal('Successfully created 4 resources');
            })
            .then(complete(done))
            .catch(done);
    })

    it('should be able to create sample templates', function(done) {
        hag(testOptions).init()
            .then(function() {
                return Promise.all([
                    compare('temp/t/example-html-template.hbs', 'fixtures/init/sample-html-template.hbs'),
                    compare('temp/t/example-text-template.hbs', 'fixtures/init/sample-text-template.hbs')
                ]);
            })
            .then(complete(done))
            .catch(done);
    });

    it('should be able to create sample data', function(done) {
        hag(testOptions).init()
            .then(function() {
                return Promise.all([
                    compare('data/example-data.json', 'fixtures/init/sample-data.json')
                ]);
            })
            .then(complete(done))
            .catch(done);
    });

    it('should be able to create sample instructions', function(done) {
        hag(testOptions).init()
            .then(function() {
                return Promise.all([
                    compare('temp/i/example-instructions.json', 'fixtures/init/sample-instructions.json')
                ]);
            })
            .then(complete(done))
            .catch(done);
    });
});
