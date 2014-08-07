"use strict";

module.exports = function(self, index) {
  var palette = self.colorPalette;

  index *= 3;

  return palette[index] | (palette[index + 1] << 8) | (palette[index + 2] << 16);
};
