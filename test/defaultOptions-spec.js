const expect = require('chai').expect;
const hag = require('../generator.js');

describe('API.defaultOptions', function() {

    const api = hag();
    const defaultOptions = api.defaultOptions;
    const expectedKeys = ['port', 'templatesPath', 'outputPath', 'instructionsPath', 'dataPath', 'activeCommand', 'serverLog'];

    describe(`should have expected keys`, function() {
        expectedKeys.forEach(function(key) {
            it(`expecting API.defaultOptions.${key}`, function() {
                expect(defaultOptions).to.have.property(key);
            });
        });
    });
});
