function stringify(value) {
    return value.toString().replace(/(?:\r\n|\r|\n)/g, '\n');
}

module.exports = stringify;
