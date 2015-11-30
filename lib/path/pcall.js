function pCall(fn, arg) {
    return new Promise(function(accept, reject) {
        fn(arg, function(err, data) {
            if (err) {
                reject(err);
            } else {
                accept(data);
            }
        });
    });
}

module.exports = pCall;