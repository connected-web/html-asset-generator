const fs = require('fs-extra');
const denodeify = require('denodeify');
const write = denodeify(fs.outputFile);

module.exports = write;
