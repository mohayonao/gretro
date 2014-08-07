"use strict";

var dot = require("./dot");

module.exports = function(self, x, y, dx, dy, sx, sy, color) {
  var e = -dx;

  for (var i = 0; i <= dx; x += sx, i++) {
    dot(self, x, y, color);

    e += 2 * dy;
    if (e >= 0)  {
      y += sy;
      e -= 2 * dx;
    }
  }
};
