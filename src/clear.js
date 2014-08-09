"use strict";

module.exports = function(self) {
  var color  = self.fillColor;
  var width  = self.width;
  var height = self.height;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      self.putPixel(x, y, color);
    }
  }
};
