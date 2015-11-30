const fs = require('fs-extra');

module.exports = function(path, data) {
    return new Promise(function(accept, reject) {
        fs.outputFile(path, data, function(err, data) {
            if (err) {
                reject(err);
            } else {
                accept(data);
            }
        });
    });
}
