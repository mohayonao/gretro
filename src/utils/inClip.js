"use strict";

var inRange = require("./inRange");

/**
 * inClip
 *
 * @param {Canvas} cnv
 * @param {int}    x
 * @param {int}    y
 */
module.exports = function(cnv, x, y) {
  return inRange(x, cnv.$.minX, cnv.$.maxX) && inRange(y, cnv.$.minY, cnv.$.maxY);
};
