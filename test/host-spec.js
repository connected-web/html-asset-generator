/* eslint-env mocha */
const path = require('path')
const expect = require('chai').expect
const clean = require('promise-path').clean
const complete = require('./helpers/complete')
const read = require('promise-path').read
const write = require('promise-path').write
const fetch = require('promise-path').fetch
const testOptions = require('./helpers/testOptions')
const hag = require('../generator.js')

describe('API.host', function () {
  beforeEach(function (done) {
    clean('temp').then(done)
  })

  afterEach(function (done) {
    clean('temp').then(done)
  })

  it('should host instructions on `/instructions`', function (done) {
    testOptions.port = testOptions.port + 1
    const api = hag(testOptions)
    let serverHost
    api.init().then(api.host).then(({ server, serverUrl }) => {
      serverHost = server
      return Promise.all([
        fetch(serverUrl + '/instructions/example-instructions.json'),
        read(global.instructionsPath + '/example-instructions.json')
      ])
    }).then(function (files) {
      expect(JSON.parse(files[0])).to.deep.equal(JSON.parse(files[1].toString()))
    }).then(complete(done)).catch(done).then(() => { serverHost.close() })
  })

  it('should host data on `/data`', function (done) {
    testOptions.port = testOptions.port + 1
    const api = hag(testOptions)
    let serverHost
    api.init().then(api.host).then(({ server, serverUrl }) => {
      serverHost = server
      return Promise.all([
        fetch(serverUrl + '/data/example-data.json'),
        read(global.dataPath + '/example-data.json')
      ])
    }).then(function (files) {
      expect(JSON.parse(files[0])).to.deep.equal(JSON.parse(files[1].toString()))
    }).then(complete(done)).catch(done).then(() => { serverHost.close() })
  })

  it('should host templates on `/templates`', function (done) {
    testOptions.port = testOptions.port + 1
    const api = hag(testOptions)
    let serverHost
    api.init().then(api.host).then(({ server, serverUrl }) => {
      serverHost = server
      return Promise.all([
        fetch(serverUrl + '/templates/example-text-template.hbs'),
        read(global.templatesPath + '/example-text-template.hbs')
      ])
    }).then(function (files) {
      expect(files[0]).to.deep.equal(files[1].toString())
    }).then(complete(done)).catch(done).then(() => { serverHost.close() })
  })

  it('should host generated assets on `/output`', function (done) {
    testOptions.port = testOptions.port + 1
    const api = hag(testOptions)
    let serverHost
    api.init().then(function () {
      return read(path.join(__dirname, 'fixtures/expected-text-asset.md')).then(function (body) {
        return write(path.join(global.outputPath, 'example-text-asset.md'), body)
      })
    }).then(api.host).then(({ server, serverUrl }) => {
      serverHost = server
      return Promise.all([
        fetch(serverUrl + '/output/example-text-asset.md'),
        read(path.join(global.outputPath, '/example-text-asset.md'))
      ])
    }).then(function (files) {
      expect(files[0]).to.deep.equal(files[1].toString())
    }).then(complete(done)).catch(done).then(() => { serverHost.close() })
  })
})
