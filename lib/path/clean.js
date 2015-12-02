const denodeify = require('denodeify');
const fs = require('fs-extra');
const remove = denodeify(fs.remove);

module.exports = remove;
