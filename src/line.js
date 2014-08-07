"use strict";

var lineH = require("./lineH");
var lineV = require("./lineV");
var lineX = require("./lineX");
var lineY = require("./lineY");

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
