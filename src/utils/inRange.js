"use strict";

/**
 * inRange
 *
 * @param {number} num
 * @param {number} min
 * @param {number} max
 */
module.exports = function(num, min, max) {
  return min <= num && num <= max;
};
