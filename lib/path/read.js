const fs = require('fs');
const denodeify = require('denodeify');
const read = denodeify(fs.readFile);

module.exports = read;
