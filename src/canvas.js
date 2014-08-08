"use strict";

var getColor = require("./getColor");
var setColor = require("./setColor");
var getTile  = require("./getTile");
var setTile  = require("./setTile");
var clear    = require("./clear");
var dot      = require("./dot");
var line     = require("./line");
var polygon  = require("./polygon");
var rect     = require("./rect");
var circle   = require("./circle");
var ellipse  = require("./ellipse");
var char     = require("./char");
var text     = require("./text");
var paint    = require("./paint");
var copy     = require("./copy");
var toRGB    = require("./toRGB");
var toRGBA   = require("./toRGBA");
var toIndexedColor = require("./toIndexedColor");
var getColorIndex  = require("./getColorIndex");

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

function defaults(val, defaultVal) {
  if (typeof val === "undefined") {
    return defaultVal;
  }
  return val;
}

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

function colorize(color, tilePalette) {
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
}

function createCanvasData(width, height, src) {
  function getPixel(x, y) {
    if (data.minX <= x && x <= data.maxX && data.minX <= y && y <= data.maxY) {
      return data.data[y * width + x];
    }
    return -1;
  }

  function putPixel(x, y, color) {
    var colorIndex = color.valueOf(x, y);
    if (colorIndex !== -1) {
      data.data[y * width + x] = colorIndex & 15;
    }
  }

  var data = {
    width : width,
    height: height,
    minX  : 0,
    minY  : 0,
    maxX  : width  - 1,
    maxY  : height - 1,
    getPixel: getPixel,
    putPixel: putPixel,
  };

  if (src) {
    data.data = new Uint8Array(src.data);
    data.colorPalette = new Uint8Array(src.colorPalette);
    data.tilePalette  = new Uint16Array(src.tilePalette);
  } else {
    data.data = new Uint8Array(width * height);
    data.colorPalette = new Uint8Array(defaultColorPalette);
    data.tilePalette  = new Uint16Array(defaultTilePalette);
  }

  return data;
}

function Canvas(width, height, src) {
  width  = defaults(width , 640)|0;
  height = defaults(height, 400)|0;

  var self = createCanvasData(width, height, src);
  var tilePalette = self.tilePalette;

  this.getWidth = function() {
    return width;
  };
  this.getHeight = function() {
    return height;
  };
  this.getRawData = function() {
    return self.data;
  };
  this.getColor = function(index) {
    return getColor(self, index & 15);
  };
  this.setColor = function(index, rgb) {
    setColor(self, index & 15, rgb|0);
    return this;
  };
  this.getTile = function(index) {
    return getTile(self, index);
  };
  this.setTile = function(index, pattern) {
    setTile(self, index & 15, pattern|0);
    return this;
  };
  this.getColorIndex = function(x, y) {
    return getColorIndex(self, x, y);
  };
  this.clear = function(color) {
    clear(self, colorize(color, tilePalette));
    return this;
  };
  this.dot = function(x, y, color) {
    dot(self, x|0, y|0, colorize(color, tilePalette));
    return this;
  };
  this.line = function(x1, y1, x2, y2, color) {
    line(self, x1|0, y1|0, x2|0, y2|0, colorize(color, tilePalette));
    return this;
  };
  this.polygon = function(vtx, color, filled) {
    vtx = Array.isArray(vtx) ? vtx.map(function(edge) {
      return [ edge[0]|0, edge[1]|0 ];
    }) : [];
    polygon(self, vtx, colorize(color, tilePalette), !!filled);
    return this;
  };
  this.rect = function(x, y, width, height, color, filled) {
    rect(self, x|0, y|0, width|0, height|0, colorize(color, tilePalette), !!filled);
    return this;
  };
  this.circle = function(cx, cy, r, color, filled) {
    circle(self, cx|0, cy|0, r|0, colorize(color, tilePalette), !!filled);
    return this;
  };
  this.ellipse = function(cx, cy, rx, ry, color, filled) {
    ellipse(self, cx|0, cy|0, rx|0, ry|0, colorize(color, tilePalette), !!filled);
    return this;
  };
  this.char = function(ch, x, y, color) {
    char(self, ch|0, x|0, y|0, colorize(color, tilePalette));
    return this;
  };
  this.text = function(str, x, y, color) {
    text(self, String(str), x|0, y|0, colorize(color, tilePalette));
    return this;
  };
  this.paint = function(x, y, color) {
    paint(self, x|0, y|0, colorize(color, tilePalette));
    return this;
  };
  this.copy = function(x1, y1, x2, y2) {
    var params = copy(self, x1|0, y1|0, x2|0, y2|0);

    return new Canvas(params[0], params[1], {
      data: params[2],
      colorPalette: new Uint8Array(self.colorPalette),
      tilePalette : new Uint16Array(self.tilePalette)
    });
  };
  this.clone = function() {
    return new Canvas(width, height, self);
  };
  this.toRGB = function() {
    return toRGB(self);
  };
  this.toRGBA = function(alpha) {
    return toRGBA(self, defaults(alpha, 255)|0);
  };
  this.toIndexedColor = function() {
    return toIndexedColor(self);
  };
}

module.exports = function(width, height) {
  return new Canvas(width, height);
};
