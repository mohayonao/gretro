"use strict";

var dot = require("./dot");

function lineH(self, x, y, dx, dy, sx, sy, color) {
  for (var i = 0; i <= dx; x += sx, i++) {
    dot(self, x, y, color);
  }
}

function lineV(self, x, y, dx, dy, sx, sy, color) {
  for (var i = 0; i <= dy; y += sy, i++) {
    dot(self, x, y, color);
  }
}

function lineX(self, x, y, dx, dy, sx, sy, color) {
  var e = -dx;

  for (var i = 0; i <= dx; x += sx, i++) {
    dot(self, x, y, color);

    e += 2 * dy;
    if (e >= 0)  {
      y += sy;
      e -= 2 * dx;
    }
  }
}

function lineY(self, x, y, dx, dy, sx, sy, color) {
  var e = -dy;

  for (var i = 0; i <= dy; y += sy, i++) {
    dot(self, x, y, color);

    e += 2 * dx;
    if (e >= 0) {
      x += sx;
      e -= 2 * dy;
    }
  }
}

module.exports = function(self, x1, y1, x2, y2, color) {
  var dx = Math.abs(x1 - x2);
  var dy = Math.abs(y1 - y2);
  var sx = x1 < x2 ? +1 : -1;
  var sy = y1 < y2 ? +1 : -1;

  if (dx === 0) {
    lineV(self, x1, y1, dx, dy, sx, sy, color);
  } else if (dy === 0) {
    lineH(self, x1, y1, dx, dy, sx, sy, color);
  } else if (dx >= dy) {
    lineX(self, x1, y1, dx, dy, sx, sy, color);
  } else {
    lineY(self, x1, y1, dx, dy, sx, sy, color);
  }
};
