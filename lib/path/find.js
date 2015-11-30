var glob = require('glob');
const pcall = require('./pcall');

module.exports = (path) =>
    pcall(glob, path);