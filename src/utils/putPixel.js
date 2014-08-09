"use strict";

var inRange = require("./inRange");

/**
 * putPixel
 *
 * @param {Canvas} cnv
 * @param {int}    x
 * @param {int}    y
 * @param {color}  color
 */
module.exports = function(cnv, x, y, color) {
  var $ = cnv.$;

  if (inRange(x, $.minX, $.maxX) && inRange(y, $.minY, $.maxY)) {
    $.putPixel(x, y, color);
  }
};
