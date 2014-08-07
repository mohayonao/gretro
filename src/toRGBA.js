"use strict";

var selectColorIndex = require("./selectColorIndex");

module.exports = function(self, alpha) {
  var result = new Uint8Array(self.width * self.height * 4);
  var data   = self.data;
  var width  = self.width;
  var height = self.height;
  var colorPalette = self.colorPalette;

  var i = 0, j = 0;
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var paletteIndex = selectColorIndex(self, x, y, data[i++]) * 3;
      result[j++] = colorPalette[paletteIndex    ];
      result[j++] = colorPalette[paletteIndex + 1];
      result[j++] = colorPalette[paletteIndex + 2];
      result[j++] = alpha;
    }
  }

  return result;
};
