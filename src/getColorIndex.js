"use strict";

module.exports = function(self, x, y) {
  if (0 <= x && x < self.width && 0 <= y && y < self.height) {
    return self.data[y * self.width + x];
  }
  return -1;
};
