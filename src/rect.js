"use strict";

var line = require("./line");

function fill(self, x1, y1, x2, y2, color) {
  for (var y = y1; y <= y2; y++) {
    line(self, x1, y, x2, y, color);
  }
}

function stroke(self, x1, y1, x2, y2, color) {
  line(self, x1, y1, x2, y1, color);
  line(self, x2, y1, x2, y2, color);
  line(self, x2, y2, x1, y2, color);
  line(self, x1, y2, x1, y1, color);
}

module.exports = function(self, x, y, w, h, color, filled) {
  var dx = Math.abs(w) - 1;
  var dy = Math.abs(h) - 1;
  var sx = w >= 0 ? +1 : -1;
  var sy = h >= 0 ? +1 : -1;
  var x1 = (sx === +1) ? x : x + dx * sx;
  var x2 = (sx === -1) ? x : x + dx * sx;
  var y1 = (sy === +1) ? y : y + dy * sy;
  var y2 = (sy === -1) ? y : y + dy * sy;

  if (filled) {
    fill(self, x1, y1, x2, y2, color);
  } else {
    stroke(self, x1, y1, x2, y2, color);
  }
};
