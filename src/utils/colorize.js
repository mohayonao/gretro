"use strict";

function fromTileItems(items, tilePalette) {
  var color1 = items[0] & 15;
  var color2 = items[1] & 15;
  var tileIndex = items[2] & 15;
  var tile = tilePalette[tileIndex];

  if (color1 === color2 || tileIndex === 0) {
    return color1;
  }

  return {
    valueOf: function(x, y) {
      return tile & (1 << ((x & 3) + (y & 3) * 4)) ? color2 : color1;
    }
  };
}

/**
 * colorize
 */
module.exports = function(color, tilePalette) {
  if (typeof color === "number") {
    return color & 15;
  }
  if (Array.isArray(color)) {
    return fromTileItems(color, tilePalette);
  }
  if (typeof color === "function") {
    return {
      valueOf: color
    };
  }
  return 0;
};
