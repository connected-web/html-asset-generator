const fs = require('fs');
const pcall = require('./pcall');

module.exports = (path) =>
    pcall(fs.readFile, path);