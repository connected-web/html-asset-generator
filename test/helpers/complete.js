function complete(done) {
    return function() {
        done();
    }
}

module.exports = complete;
