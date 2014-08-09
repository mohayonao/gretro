"use strict";

/**
 * rgb2num
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} rgb
 */
module.exports = function(r, g, b) {
  return r + (g << 8) + (b << 16);
};
