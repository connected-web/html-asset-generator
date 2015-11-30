var cache = {};

function store(key, value) {
  cache[key] = value;
}

function read(key) {
  return cache[key];
}

function remove(key) {
  var item = cache[key];
  delete cache[key];
  return item;
}

function list() {
  return Object.keys(cache);
}

var instance = {
  store: store,
  read: read,
  remove: remove,
  list: list
}

module.exports = instance;
