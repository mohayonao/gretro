"use strict";

module.exports = function(self, index, rgb) {
  var palette = self.colorPalette;

  index *= 3;

  palette[index    ] = ((rgb >>  4) & 0x0f) * 0x11;
  palette[index + 1] = ((rgb >> 12) & 0x0f) * 0x11;
  palette[index + 2] = ((rgb >> 20) & 0x0f) * 0x11;
};
