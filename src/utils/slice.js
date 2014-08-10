"use strict";

var slice = Array.prototype.slice;

/**
 * slice
 *
 * @param {array} list
 * @param {int}   [n=0]
 */
module.exports = function(list, n) {
  return slice.call(list, n|0);
};
