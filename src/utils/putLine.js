"use strict";

var inRange = require("./inRange");

/**
 * putLine
 */
module.exports = function(that, x1, x2, y, color) {
  var $ = that.$;

  if (inRange(y, $.minY, $.maxY)) {
    x1 = Math.max(x1, $.minX);
    x2 = Math.min(x2, $.maxX);

    while (x1 <= x2) {
      $.putPixel(x1++, y, color);
    }
  }
};
