'use strict';

var colors = require('colors');

var host = 'https://app.adaptive.me';
exports.host = host;

// -------------------------------------------------------------------------- //
// VALIDATIONS
// -------------------------------------------------------------------------- //

/**
 * Function that validates a string pattern
 * @param input string introduced
 * @returns {*} true if the input is correct, a string with the error msg otherwise
 */
function validateString(input) {
  if (!input) {
    return 'ERROR: The string cannot be empty'.red;
  } else if (!(/^([a-z0-9]*)$/.test(input))) {
    return 'ERROR: The string cannot contain special characters or a blank space'.red;
  } else {
    return true;
  }
}
exports.validateString = validateString;

/**
 * Function that validates a java package pattern
 * @param input java package introduced
 * @returns {*} true if the input is correct, a string with the error msg otherwise
 */
function validatePackage(input) {

  if (!input) {
    return 'ERROR: The string cannot be empty'.red;
  } else if (!(/^([a-z_.]*)$/.test(input))) {
    return 'ERROR: The string cannot contain special characters or a blank space'.red;
  } else {
    return true;
  }
}
exports.validatePackage = validatePackage;
