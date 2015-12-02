const glob = require('glob');
const denodeify = require('denodeify');
const find = denodeify(glob);

module.exports = find;
