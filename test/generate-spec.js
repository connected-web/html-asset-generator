/* eslint-env mocha */
const expect = require('chai').expect
const clean = require('promise-path').clean
const complete = require('./helpers/complete')
const compare = require('./helpers/compare')
const testOptions = require('./helpers/testOptions')
const hag = require('../generator.js')

describe('API.generate', function () {
  beforeEach(function (done) {
    clean('temp').then(done)
  })

  afterEach(function (done) {
    clean('temp').then(done)
  })

  it('should generate the correct output based on instructions, templates and data', function (done) {
    const api = hag(testOptions)
    api.init().then(api.generate).then(function (message) {
      expect(message).to.equal('Completed work OK: 3, instructions total')
    }).then(function () {
      console.log('Completed work or something')
      return Promise.all([
        compare('temp/b/example-text-asset.md', 'test/fixtures/expected-text-asset.md'),
        compare('temp/b/example-json-asset.json', 'test/fixtures/expected-json-asset.json')
      ])
    }).then(complete(done)).catch(done)
  })
})
