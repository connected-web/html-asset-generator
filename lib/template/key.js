var crypto = require('crypto')

function create(data) {
  var key = crypto.createHash('sha1').update(JSON.stringify(data)).digest('hex')
  return sanitize(key)
}

function sanitize(string) {
  return string
    .replace(/\s/g, '-')
    .replace(/[^A-z0-9-_\.]/g, '')
    .toLowerCase()
}

module.exports = {
  create: create
}
