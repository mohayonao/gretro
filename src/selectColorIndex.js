"use strict";

module.exports = function(self, x, y, color) {
  if (color & 0x0f00) {
    var tile  = self.tilePalette[color >> 8];
    var mask  = 1 << ((x & 3) + (y & 3) * 4);
    var which = tile & mask;

    return which ? (color & 0xf0) >> 4 : (color & 0x0f);
  }
  return color & 0x0f;
};
