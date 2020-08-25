"use strict";

/**
 * Contains all the utils methods
 *
 */

// Container of the Utils
const utils = {};

/**
 * @param {*} val
 * @returns {Boolean}
 */
utils.isObject = (val) => {
  return val instanceof Object && val.constructor === Object;
};

/**
 *
 * @param {Error} err
 * @returns {Object}
 */
utils.logError = (err) => {
  console.log(err);
  return {
    err: true,
    msg: err.message,
  };
};

// Export the module
module.exports = utils;
