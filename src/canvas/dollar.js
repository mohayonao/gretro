"use strict";

var defaultColorPalette = new Uint8Array([
  0x00, 0x00, 0x00, // black
  0x00, 0x00, 0x77, // dark blue
  0x77, 0x00, 0x00, // dark red
  0x77, 0x00, 0x77, // dark magenta
  0x00, 0x77, 0x00, // dark green
  0x00, 0x77, 0x77, // dark cyan
  0x77, 0x77, 0x00, // dark yellow
  0x77, 0x77, 0x77, // dark white
  0x44, 0x44, 0x44, // light black
  0x00, 0x00, 0xff, // blue
  0xff, 0x00, 0x00, // red
  0xff, 0x00, 0xff, // magenta
  0x00, 0xff, 0x00, // green
  0x00, 0xff, 0xff, // cyan
  0xff, 0xff, 0x00, // yellow
  0xff, 0xff, 0xff, // white
]);

var defaultTilePalette = new Uint16Array([
  0x0000, 0x0001, 0x0401, 0x0405,
  0x0505, 0x0525, 0x8525, 0x85a5,
  0xa5a5, 0xa5a7, 0xada7, 0xadaf,
  0xafaf, 0xafbf, 0xefbf, 0xefff,
]);

module.exports = function(width, height, pixelSize, buffer) {
  var data = {
    width : width,
    height: height,
    minX: 0,
    minY: 0,
    maxX: width  - 1,
    maxY: height - 1,
    mask: null,
    strokeColor:  0,
    fillColor  : -1,
    pixelSize  : pixelSize,
    colorPalette: new Uint8Array(defaultColorPalette),
    tilePalette : new Uint16Array(defaultTilePalette),
    storableKeys:[
      "mask", "minX", "minY", "maxX", "maxY", "strokeColor", "fillColor"
    ]
  };

  if (buffer instanceof Uint8Array) {
    data.data = buffer;
  } else {
    data.data = new Uint8Array(width * height * pixelSize);
  }

  return data;
};
