"use strict";

var inRange = require("./inRange");

/**
 * putLine
 *
 * @param {Canvas} cnv
 * @param {int}    x1
 * @param {int}    x2
 * @param {int}    y
 * @param {color}  color
 */
module.exports = function(cnv, x1, x2, y, color) {
  var $ = cnv.$;

  if (inRange(y, $.minY, $.maxY)) {
    x1 = Math.max(x1, $.minX);
    x2 = Math.min(x2, $.maxX);

    while (x1 <= x2) {
      $.putPixel(x1++, y, color);
    }
  }
};
