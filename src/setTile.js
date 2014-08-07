"use strict";

module.exports = function(self, index, pattern) {
  if (index !== 0) {
    self.tilePalette[index] = pattern;
  }
};
