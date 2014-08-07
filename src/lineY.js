"use strict";

var dot = require("./dot");

module.exports = function(self, x, y, dx, dy, sx, sy, color) {
  var e = -dy;

  for (var i = 0; i <= dy; y += sy, i++) {
    dot(self, x, y, color);

    e += 2 * dx;
    if (e >= 0) {
      x += sx;
      e -= 2 * dy;
    }
  }
};
