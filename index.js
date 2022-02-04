function toKey(str) {
  return str
    .split(/[^a-zA-Z0-9]/gim)
    .filter(Boolean)
    .join('_')
    .toUpperCase();
}

function matches(str) {
  return [...new Set([...str.matchAll(/(--[^:,)]+)/gim)].flat())];
}

function assign(acc, value) {
  return Object.assign(acc, { [toKey(value)]: value });
}

module.exports = function (strings, ...values) {
  const str = strings
    .filter(Boolean)
    .reduce((acc, str, i) => acc + str + (values[i] || ''), '');

  return matches(str).reduce(assign, {
    toString() { return str },
  });
};
