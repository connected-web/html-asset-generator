const fs = require('fs-extra');
const pcall = require('./pcall');

module.exports = (path) =>
    pcall(fs.remove, path);