const expect = require('chai').expect
const read = require('promise-path').read
const stringify = require('./stringify')

function compare (actualPath, expectedPath) {
  return Promise.all([
    read(actualPath).then(stringify),
    read(expectedPath).then(stringify)
  ]).then(function (files) {
    expect(files[0].trim()).to.equal(files[1].trim())
  })
}

module.exports = compare
