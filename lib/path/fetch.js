const request = require('request');
const denodeify = require('denodeify');
const fetch = denodeify(request);

module.exports = fetch;
