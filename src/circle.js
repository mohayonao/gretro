"use strict";

var dot   = require("./dot");
var lineH = require("./lineH");

function process(self, cx, cy, r, delegate) {
  var x  = r;
  var y  = 0;
  var f  = -3 * r + 3;

  while (x >= y) {
    delegate(x, y);

    if (f >= 0) {
      f -= 4 * (--x);
    }
    f += 4 * (++y) + 2;
  }
}

function fill(self, cx, cy, r, color) {
  process(self, cx, cy, r, function(x, y) {
    lineH(self, cx - x, cy - y, x * 2, 0, 1, 0, color);
    lineH(self, cx - x, cy + y, x * 2, 0, 1, 0, color);
    lineH(self, cx - y, cy + x, y * 2, 0, 1, 0, color);
    lineH(self, cx - y, cy - x, y * 2, 0, 1, 0, color);
  });
}

function stroke(self, cx, cy, r, color) {
  process(self, cx, cy, r, function(x, y) {
    dot(self, cx + x, cy + y, color);
    dot(self, cx - x, cy + y, color);
    dot(self, cx + x, cy - y, color);
    dot(self, cx - x, cy - y, color);
    dot(self, cx + y, cy + x, color);
    dot(self, cx - y, cy + x, color);
    dot(self, cx + y, cy - x, color);
    dot(self, cx - y, cy - x, color);
  });
}

module.exports = function(self, cx, cy, r, color, filled) {
  if (filled) {
    fill(self, cx, cy, r, color);
  } else {
    stroke(self, cx, cy, r, color);
  }
};
