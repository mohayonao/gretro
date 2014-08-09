"use strict";

/**
 * defaults
 */
module.exports = function(val, defaultVal) {
  if (typeof val === "undefined") {
    return defaultVal;
  }
  return val;
};
