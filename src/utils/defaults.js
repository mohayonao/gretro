"use strict";

/**
 * defaults
 *
 * @param {any} val
 * @param {any} defaultVal
 */
module.exports = function(val, defaultVal) {
  if (typeof val === "undefined") {
    return defaultVal;
  }
  return val;
};
