"use strict";

var inRange = require("./inRange");

/**
 * putPixel
 */
module.exports = function(that, x, y, color) {
  var $ = that.$;

  if (inRange(x, $.minX, $.maxX) && inRange(y, $.minY, $.maxY)) {
    $.putPixel(x, y, color);
  }
};
