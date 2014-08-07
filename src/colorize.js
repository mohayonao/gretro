"use strict";

function fromTileItems(items) {
  var color1 = items[0] & 15;
  var color2 = items[1] & 15;
  var tileIndex = items[2] & 15;

  if (color1 === color2 || tileIndex === 0) {
    return color1;
  }

  return color1 | (color2 << 4) | (tileIndex << 8);
}

module.exports = function(color) {
  if (typeof color === "number") {
    return color & 15;
  }
  if (Array.isArray(color)) {
    return fromTileItems(color);
  }
  return 0;
};
