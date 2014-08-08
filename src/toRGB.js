"use strict";

module.exports = function(self) {
  var result = new Uint8Array(self.width * self.height * 3);
  var data   = self.data;
  var width  = self.width;
  var height = self.height;
  var colorPalette = self.colorPalette;

  var i = 0, j = 0;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var paletteIndex = data[i++] * 3;
      result[j++] = colorPalette[paletteIndex    ];
      result[j++] = colorPalette[paletteIndex + 1];
      result[j++] = colorPalette[paletteIndex + 2];
    }
  }

  return result;
};
