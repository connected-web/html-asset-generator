const expect = require('chai').expect;
const clean = require('promise-path').clean;
const run = require('promise-path').run;
const stringify = require('./helpers/stringify');
const complete = require('./helpers/complete');
const compare = require('./helpers/compare');
const testOptions = require('./helpers/testOptions');

describe('Command Line Interface', function() {

    var initCommand = [
        `node ./bin/hag init`,
        `-i ${testOptions.instructionsPath}`,
        `-t ${testOptions.templatesPath}`,
        `-o ${testOptions.outputPath}`,
        `-d ${testOptions.dataPath}`
    ].join(' ');

    var generateString = [
        `node ./bin/hag generate`,
        `-i ${testOptions.instructionsPath}`,
        `-t ${testOptions.templatesPath}`,
        `-o ${testOptions.outputPath}`,
        `-d ${testOptions.dataPath}`
    ].join(' ');

    beforeEach(function(done) {
        clean('temp')
            .then(() => {
                return run(initCommand, process.cwd())
            })
            .then(function(result) {
                // console.log('Init', initCommand, result);
            })
            .then(done);
    });

    afterEach(function(done) {
        done(); //clean('tempx').then(done);
    });

    it('should generate the correct output based on instructions, templates and data', function(done) {

        run(generateString, process.cwd())
            .then(function(result) {
                expect(result.stderr).to.equal('');
                expect(result.stdout).to.contain('Completed work OK: 3, instructions total');
                expect(result.exitCode).to.equal(0);
            })
            .then(function() {
                return Promise.all([
                    compare('temp/b/example-text-asset.md', 'test/fixtures/expected-text-asset.md'),
                    compare('temp/b/example-json-asset.json', 'test/fixtures/expected-json-asset.json')
                ]);
            })
            .then(complete(done))
            .catch(done);
    });
});
