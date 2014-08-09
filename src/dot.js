"use strict";

module.exports = function(self, x, y) {
  if (self.strokeColor !== -1) {
    if (self.minX <= x && x <= self.maxX && self.minY <= y && y <= self.maxY) {
      self.putPixel(x, y, self.strokeColor);
    }
  }
};
