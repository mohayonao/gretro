"use strict";

var dot  = require("./dot");
var line = require("./line");

function process(self, cx, cy, rx, ry, delegate) {
  var x = rx;
  var y = 0;
  var b = Math.pow(rx / ry, 2);
  var d = rx;
  var f = -2 * d +     1 + 2 * b;
  var h = -4 * d + 2 * 1     + b;

  while (x >= 0) {
    delegate(x, y);

    if (f >= 0) {
      x--;
      f -= 4 * x;
      h -= 4 * x - 2;
    }
    if (h < 0) {
      y++;
      f += 4 * b * y + 2 * b;
      h += 4 * b * y;
    }
  }
}

function fill(self, cx, cy, rx, ry, color) {
  process(self, cx, cy, rx, ry, function(x, y) {
    line(self, cx - x, cy + y, cx + x, cy + y, color);
    line(self, cx - x, cy - y, cx + x, cy - y, color);
  });
}

function stroke(self, cx, cy, rx, ry, color) {
  process(self, cx, cy, rx, ry, function(x, y) {
    dot(self, cx + x, cy + y, color);
    dot(self, cx - x, cy + y, color);
    dot(self, cx + x, cy - y, color);
    dot(self, cx - x, cy - y, color);
  });
}

module.exports = function(self, cx, cy, rx, ry, color, filled) {
  if (filled) {
    fill(self, cx, cy, rx, ry, color);
  } else {
    stroke(self, cx, cy, rx, ry, color);
  }
};
