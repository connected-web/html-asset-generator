function create(data) {
  return sanitize(data.title || data.name || 'default');
}

function sanitize(string) {
  return string
    .replace(/\s/g, '-')
    .replace(/[^A-z0-9-]/g, '')
    .toLowerCase();
}

module.exports = {
  create: create
}
