"use strict";

module.exports = function(self, x, y, color) {
  if (self.minX <= x && x <= self.maxX && self.minX <= y && y <= self.maxY) {
    self.putPixel(x, y, color);
  }
};
