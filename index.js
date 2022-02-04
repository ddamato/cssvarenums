/**
 * Transforms the CSS Custom Property into SCREAMING_SNAKE_CASE
 * 
 * @param {String} str - The css custom property string 
 * @returns {String} - A SCREAMING_SNAKE_CASE version of the input string
 */
function keyify(str) {
  return str
    // split on non-alphanumeric characters
    .split(/[^a-zA-Z0-9]/gim)
    // Drop any empty strings from result
    .filter(Boolean)
    // Join with underscores
    .join('_')
    // Uppercase the result
    .toUpperCase();
}

/**
 * Identifies all the CSS Custom Properties within a given text
 * 
 * @param {String} str - Text content which could contain CSS Custom Properties
 * @returns {Array<String>} - A unique array of CSS Custom Properties
 */
function matches(str) {
  return [...new Set([...str.matchAll(/(--[^:,)]+)/gim)].flat())];
}

/**
 * Transforms CSS Custom Properties into collection of enums
 * 
 * @param {Object} acc - The accumulator for the reduce method 
 * @param {String} value - The current CSS Custom Property
 * @returns {Object} - A collection of [enum]: value pairs
 */
function assign(acc, value) {
  return Object.assign(acc, { [keyify(value)]: value });
}

/**
 * Parses the given text for CSS Custom Properties, returns a collection of enums based on the findings.
 * 
 * @param {Array<String>} strings - A collection of strings within the template tag function
 * @param  {...any} values - Expressions given within the template tag
 * @returns {Object} - A collection of [enum]: value pairs with an overloaded .toString() method to return the compiled string.
 */
module.exports = function (strings, ...values) {
  const str = strings
    .filter(Boolean)
    .reduce((acc, str, i) => acc + str + (values[i] || ''), '');

  return matches(str).reduce(assign, {
    toString() { return str },
  });
};
