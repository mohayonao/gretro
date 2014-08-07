"use strict";

var lineH = require("./lineH");
var lineV = require("./lineV");

function fill(self, x, y, w, h, dx, dy, sx, sy, color) {
  for (var i = 0; i <= dy; y += sy, i++) {
    lineH(self, x, y, dx, 0, sx, 0, color);
  }
}

function stroke(self, x, y, w, h, dx, dy, sx, sy, color) {
  lineH(self, x         , y         , dx,  0, sx,  0, color);
  lineH(self, x         , y + h - sy, dx,  0, sx,  0, color);
  lineV(self, x         , y         ,  0, dy,  0, sy, color);
  lineV(self, x + w - sx, y         ,  0, dy,  0, sy, color);
}

module.exports = function(self, x, y, w, h, color, filled) {
  var dx = Math.abs(w) - 1;
  var dy = Math.abs(h) - 1;
  var sx = w >= 0 ? +1 : -1;
  var sy = h >= 0 ? +1 : -1;

  if (filled) {
    fill(self, x, y, w, h, dx, dy, sx, sy, color);
  } else {
    stroke(self, x, y, w, h, dx, dy, sx, sy, color);
  }
};
