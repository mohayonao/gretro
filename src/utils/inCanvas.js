"use strict";

var inRange = require("./inRange");

/**
 * inCanvas
 *
 * @param {Canvas} cnv
 * @param {int}    x
 * @param {int}    y
 */
module.exports = function(cnv, x, y) {
  return inRange(x, 0, cnv.$.width - 1) && inRange(y, 0, cnv.$.height - 1);
};
