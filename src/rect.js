"use strict";

var line = require("./line");

function _line(self, x1, x2, y, color) {
  if (self.minY <= y && y <= self.maxY) {
    x1 = Math.max(x1, self.minX);
    x2 = Math.min(x2, self.maxX);

    while (x1 <= x2) {
      self.putPixel(x1++, y, color);
    }
  }
}

function fill(self, x1, y1, x2, y2) {
  var color = self.fillColor;

  for (var y = y1; y <= y2; y++) {
    _line(self, x1, x2, y, color);
  }
}

function stroke(self, x1, y1, x2, y2) {
  line(self, x1, y1, x2, y1);
  line(self, x2, y1, x2, y2);
  line(self, x2, y2, x1, y2);
  line(self, x1, y2, x1, y1);
}

module.exports = function(self, x, y, w, h) {
  var dx = Math.abs(w) - 1;
  var dy = Math.abs(h) - 1;
  var sx = w >= 0 ? +1 : -1;
  var sy = h >= 0 ? +1 : -1;
  var x1 = (sx === +1) ? x : x + dx * sx;
  var x2 = (sx === -1) ? x : x + dx * sx;
  var y1 = (sy === +1) ? y : y + dy * sy;
  var y2 = (sy === -1) ? y : y + dy * sy;

  if (self.fillColor !== -1) {
    fill(self, x1, y1, x2, y2);
  }
  if (self.strokeColor !== -1) {
    stroke(self, x1, y1, x2, y2);
  }
};
