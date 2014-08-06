(function(global) {
  "use strict";

  function int(num) {
    return (num|0);
  }

  function nib(num) {
    return (num|0) & 15;
  }

  function defaults(val, defaultVal) {
    if (typeof val === "undefined") {
      return defaultVal;
    }
    return val;
  }

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

  var fonts = [
    [ 0x00, 0x00, 0x5f, 0x00, 0x00 ], // !
    [ 0x00, 0x07, 0x00, 0x07, 0x00 ], // "
    [ 0x14, 0x7f, 0x14, 0x7f, 0x14 ], // #
    [ 0x24, 0x2a, 0x7f, 0x2a, 0x12 ], // $
    [ 0x23, 0x13, 0x08, 0x64, 0x62 ], // %
    [ 0x36, 0x49, 0x55, 0x22, 0x50 ], // &
    [ 0x00, 0x05, 0x03, 0x00, 0x00 ], // '
    [ 0x00, 0x1c, 0x22, 0x41, 0x00 ], // (
    [ 0x00, 0x41, 0x22, 0x1c, 0x00 ], // )
    [ 0x08, 0x2a, 0x1c, 0x2a, 0x08 ], // *
    [ 0x08, 0x08, 0x3e, 0x08, 0x08 ], // +
    [ 0x00, 0x50, 0x30, 0x00, 0x00 ], // ,
    [ 0x08, 0x08, 0x08, 0x08, 0x08 ], // -
    [ 0x00, 0x60, 0x60, 0x00, 0x00 ], // .
    [ 0x20, 0x10, 0x08, 0x04, 0x02 ], // /
    [ 0x3e, 0x51, 0x49, 0x45, 0x3e ], // 0
    [ 0x00, 0x42, 0x7f, 0x40, 0x00 ], // 1
    [ 0x42, 0x61, 0x51, 0x49, 0x46 ], // 2
    [ 0x21, 0x41, 0x45, 0x4b, 0x31 ], // 3
    [ 0x18, 0x14, 0x12, 0x7f, 0x10 ], // 4
    [ 0x27, 0x45, 0x45, 0x45, 0x39 ], // 5
    [ 0x3c, 0x4a, 0x49, 0x49, 0x30 ], // 6
    [ 0x01, 0x71, 0x09, 0x05, 0x03 ], // 7
    [ 0x36, 0x49, 0x49, 0x49, 0x36 ], // 8
    [ 0x06, 0x49, 0x49, 0x29, 0x1e ], // 9
    [ 0x00, 0x36, 0x36, 0x00, 0x00 ], // :
    [ 0x00, 0x56, 0x36, 0x00, 0x00 ], // ;
    [ 0x00, 0x08, 0x14, 0x22, 0x41 ], // <
    [ 0x14, 0x14, 0x14, 0x14, 0x14 ], // =
    [ 0x41, 0x22, 0x14, 0x08, 0x00 ], // >
    [ 0x02, 0x01, 0x51, 0x09, 0x06 ], // ?
    [ 0x32, 0x49, 0x79, 0x41, 0x3e ], // @
    [ 0x7e, 0x11, 0x11, 0x11, 0x7e ], // A
    [ 0x7f, 0x49, 0x49, 0x49, 0x36 ], // B
    [ 0x3e, 0x41, 0x41, 0x41, 0x22 ], // C
    [ 0x7f, 0x41, 0x41, 0x22, 0x1c ], // D
    [ 0x7f, 0x49, 0x49, 0x49, 0x41 ], // E
    [ 0x7f, 0x09, 0x09, 0x01, 0x01 ], // F
    [ 0x3e, 0x41, 0x41, 0x51, 0x32 ], // G
    [ 0x7f, 0x08, 0x08, 0x08, 0x7f ], // H
    [ 0x00, 0x41, 0x7f, 0x41, 0x00 ], // I
    [ 0x20, 0x40, 0x41, 0x3f, 0x01 ], // J
    [ 0x7f, 0x08, 0x14, 0x22, 0x41 ], // K
    [ 0x7f, 0x40, 0x40, 0x40, 0x40 ], // L
    [ 0x7f, 0x02, 0x04, 0x02, 0x7f ], // M
    [ 0x7f, 0x04, 0x08, 0x10, 0x7f ], // N
    [ 0x3e, 0x41, 0x41, 0x41, 0x3e ], // O
    [ 0x7f, 0x09, 0x09, 0x09, 0x06 ], // P
    [ 0x3e, 0x41, 0x51, 0x21, 0x5e ], // Q
    [ 0x7f, 0x09, 0x19, 0x29, 0x46 ], // R
    [ 0x46, 0x49, 0x49, 0x49, 0x31 ], // S
    [ 0x01, 0x01, 0x7f, 0x01, 0x01 ], // T
    [ 0x3f, 0x40, 0x40, 0x40, 0x3f ], // U
    [ 0x1f, 0x20, 0x40, 0x20, 0x1f ], // V
    [ 0x7f, 0x20, 0x18, 0x20, 0x7f ], // W
    [ 0x63, 0x14, 0x08, 0x14, 0x63 ], // X
    [ 0x03, 0x04, 0x78, 0x04, 0x03 ], // Y
    [ 0x61, 0x51, 0x49, 0x45, 0x43 ], // Z
    [ 0x00, 0x00, 0x7f, 0x41, 0x41 ], // [
    [ 0x02, 0x04, 0x08, 0x10, 0x20 ], // \
    [ 0x41, 0x41, 0x7f, 0x00, 0x00 ], // ]
    [ 0x04, 0x02, 0x01, 0x02, 0x04 ], // ^
    [ 0x40, 0x40, 0x40, 0x40, 0x40 ], // _
    [ 0x00, 0x01, 0x02, 0x04, 0x00 ], // `
    [ 0x20, 0x54, 0x54, 0x54, 0x78 ], // a
    [ 0x7f, 0x48, 0x44, 0x44, 0x38 ], // b
    [ 0x38, 0x44, 0x44, 0x44, 0x20 ], // c
    [ 0x38, 0x44, 0x44, 0x48, 0x7f ], // d
    [ 0x38, 0x54, 0x54, 0x54, 0x18 ], // e
    [ 0x08, 0x7e, 0x09, 0x01, 0x02 ], // f
    [ 0x08, 0x14, 0x54, 0x54, 0x3c ], // g
    [ 0x7f, 0x08, 0x04, 0x04, 0x78 ], // h
    [ 0x00, 0x44, 0x7d, 0x40, 0x00 ], // i
    [ 0x20, 0x40, 0x44, 0x3d, 0x00 ], // j
    [ 0x00, 0x7f, 0x10, 0x28, 0x44 ], // k
    [ 0x00, 0x41, 0x7f, 0x40, 0x00 ], // l
    [ 0x7c, 0x04, 0x18, 0x04, 0x78 ], // m
    [ 0x7c, 0x08, 0x04, 0x04, 0x78 ], // n
    [ 0x38, 0x44, 0x44, 0x44, 0x38 ], // o
    [ 0x7c, 0x14, 0x14, 0x14, 0x08 ], // p
    [ 0x08, 0x14, 0x14, 0x18, 0x7c ], // q
    [ 0x7c, 0x08, 0x04, 0x04, 0x08 ], // r
    [ 0x48, 0x54, 0x54, 0x54, 0x20 ], // s
    [ 0x04, 0x3f, 0x44, 0x40, 0x20 ], // t
    [ 0x3c, 0x40, 0x40, 0x20, 0x7c ], // u
    [ 0x1c, 0x20, 0x40, 0x20, 0x1c ], // v
    [ 0x3c, 0x40, 0x30, 0x40, 0x3c ], // w
    [ 0x44, 0x28, 0x10, 0x28, 0x44 ], // x
    [ 0x0c, 0x50, 0x50, 0x50, 0x3c ], // y
    [ 0x44, 0x64, 0x54, 0x4c, 0x44 ], // z
    [ 0x00, 0x08, 0x36, 0x41, 0x00 ], // {
    [ 0x00, 0x00, 0x7f, 0x00, 0x00 ], // |
    [ 0x00, 0x41, 0x36, 0x08, 0x00 ], // }
  ];

  function getPixel(self, x, y) {
    if (0 <= x && x < self.width && 0 <= y && y < self.height) {
      return self.data[y * self.width + x];
    }
    return -1;
  }

  function getColor(self, index) {
    var palette = self.colorPalette;

    index *= 3;

    return palette[index] | (palette[index + 1] << 8) | (palette[index + 2] << 16);
  }

  function setColor(self, index, rgb) {
    var palette = self.colorPalette;

    index *= 3;
    palette[index    ] = (rgb >>  0) & 0xff;
    palette[index + 1] = (rgb >>  8) & 0xff;
    palette[index + 2] = (rgb >> 16) & 0xff;
  }

  function getTile(self, index) {
    return self.tilePalette[index];
  }

  function setTile(self, index, pattern) {
    if (index !== 0) {
      self.tilePalette[index] = pattern;
    }
  }

  function clear(self, color) {
    var data = self.data;

    for (var i = 0, imax = data.length; i < imax; i++) {
      data[i] = color;
    }
  }

  function dot(self, x, y, color) {
    if (0 <= x && x < self.width && 0 <= y && y < self.height) {
      self.data[y * self.width + x] = color;
    }
  }

  function line(self, x1, y1, x2, y2, color) {
    var dx = Math.abs(x1 - x2);
    var dy = Math.abs(y1 - y2);
    var sx = x1 < x2 ? +1 : -1;
    var sy = y1 < y2 ? +1 : -1;

    if (dx === 0) {
      lineV(self, x1, y1, dx, dy, sx, sy, color);
    } else if (dy === 0) {
      lineH(self, x1, y1, dx, dy, sx, sy, color);
    } else if (dx >= dy) {
      lineX(self, x1, y1, dx, dy, sx, sy, color);
    } else {
      lineY(self, x1, y1, dx, dy, sx, sy, color);
    }
  }

  function lineH(self, x, y, dx, dy, sx, sy, color) {
    for (var i = 0; i <= dx; x += sx, i++) {
      dot(self, x, y, color);
    }
  }

  function lineV(self, x, y, dx, dy, sx, sy, color) {
    for (var i = 0; i <= dy; y += sy, i++) {
      dot(self, x, y, color);
    }
  }

  function lineX(self, x, y, dx, dy, sx, sy, color) {
    var e = -dx;

    for (var i = 0; i <= dx; x += sx, i++) {
      dot(self, x, y, color);

      e += 2 * dy;
      if (e >= 0)  {
        y += sy;
        e -= 2 * dx;
      }
    }
  }

  function lineY(self, x, y, dx, dy, sx, sy, color) {
    var e = -dy;

    for (var i = 0; i <= dy; y += sy, i++) {
      dot(self, x, y, color);

      e += 2 * dx;
      if (e >= 0) {
        x += sx;
        e -= 2 * dy;
      }
    }
  }

  function rect(self, x, y, w, h, color, filled) {
    var dx = Math.abs(w) - 1;
    var dy = Math.abs(h) - 1;
    var sx = w >= 0 ? +1 : -1;
    var sy = h >= 0 ? +1 : -1;

    if (filled) {
      fillRect(self, x, y, w, h, dx, dy, sx, sy, color);
    } else {
      strokeRect(self, x, y, w, h, dx, dy, sx, sy, color);
    }
  }

  function fillRect(self, x, y, w, h, dx, dy, sx, sy, color) {
    for (var i = 0; i <= dy; y += sy, i++) {
      lineH(self, x, y, dx, 0, sx, 0, color);
    }
  }

  function strokeRect(self, x, y, w, h, dx, dy, sx, sy, color) {
    lineH(self, x         , y         , dx,  0, sx,  0, color);
    lineH(self, x         , y + h - sy, dx,  0, sx,  0, color);
    lineV(self, x         , y         ,  0, dy,  0, sy, color);
    lineV(self, x + w - sx, y         ,  0, dy,  0, sy, color);
  }

  function circle(self, cx, cy, r, color, filled) {
    if (filled) {
      fillCircle(self, cx, cy, r, color);
    } else {
      strokeCircle(self, cx, cy, r, color);
    }
  }

  function fillCircle(self, cx, cy, r, color) {
    doCircle(self, cx, cy, r, function(x, y) {
      lineH(self, cx - x, cy - y, x * 2, 0, 1, 0, color);
      lineH(self, cx - x, cy + y, x * 2, 0, 1, 0, color);
      lineH(self, cx - y, cy + x, y * 2, 0, 1, 0, color);
      lineH(self, cx - y, cy - x, y * 2, 0, 1, 0, color);
    });
  }

  function strokeCircle(self, cx, cy, r, color) {
    doCircle(self, cx, cy, r, function(x, y) {
      dot(self, cx + x, cy + y, color);
      dot(self, cx - x, cy + y, color);
      dot(self, cx + x, cy - y, color);
      dot(self, cx - x, cy - y, color);
      dot(self, cx + y, cy + x, color);
      dot(self, cx - y, cy + x, color);
      dot(self, cx + y, cy - x, color);
      dot(self, cx - y, cy - x, color);
    });
  }

  function doCircle(self, cx, cy, r, delegate) {
    var x  = r;
    var y  = 0;
    var f  = -3 * r + 3;

    while (x >= y) {
      delegate(x, y);

      if (f >= 0) {
        f -= 4 * (--x);
      }
      f += 4 * (++y) + 2;
    }
  }

  function ellipse(self, cx, cy, rx, ry, color, filled) {
    if (filled) {
      fillEllipse(self, cx, cy, rx, ry, color);
    } else {
      strokeEllipse(self, cx, cy, rx, ry, color);
    }
  }

  function fillEllipse(self, cx, cy, rx, ry, color) {
    doEllipse(self, cx, cy, rx, ry, function(x, y) {
      lineH(self, cx - x, cy + y, x * 2, 0, 1, 0, color);
      lineH(self, cx - x, cy - y, x * 2, 0, 1, 0, color);
    });
  }

  function strokeEllipse(self, cx, cy, rx, ry, color) {
    doEllipse(self, cx, cy, rx, ry, function(x, y) {
      dot(self, cx + x, cy + y, color);
      dot(self, cx - x, cy + y, color);
      dot(self, cx + x, cy - y, color);
      dot(self, cx - x, cy - y, color);
    });
  }

  function doEllipse(self, cx, cy, rx, ry, delegate) {
    var x = rx;
    var y = 0;
    var b = Math.pow(rx / ry, 2);
    var d = rx;
    var f = -2 * d +     1 + 2 * b;
    var h = -4 * d + 2 * 1     + b;

    while (x >= 0) {
      delegate(x, y);

      if (f >= 0) {
        x--;
        f -= 4 * x;
        h -= 4 * x - 2;
      }
      if (h < 0) {
        y++;
        f += 4 * b * y + 2 * b;
        h += 4 * b * y;
      }
    }
  }

  function text(self, str, x, y, color) {
    str.split("").forEach(function(ch, i) {
      ch = ch.charCodeAt(0);
      if (0x21 <= ch && ch <= 0x7e) {
        char(self, ch, x + i * 6, y, color);
      }
    });
  }

  function char(self, ch, x, y, color) {
    var font = fonts[ch - 0x21];

    font.forEach(function(part, i) {
      [ 1, 2, 4, 8, 16, 32, 64 ].forEach(function(bit, j) {
        if (part & bit) {
          dot(self, x + i, y + j, color);
        }
      });
    });
  }

  function paint(self, x, y, color, filled) {
    if (filled) {
      fillPaint(self, x, y, color);
    } else {
      dropPaint(self, x, y, color);
    }
  }

  function dropPaint(self, x, y, color) {
    var targetColor = getPixel(self, x, y);
    var isEdge = function(x, y) {
      return getPixel(self, x, y) !== targetColor;
    };
    var scanLine = function(lx, rx, y, q) {
      while (lx <= rx) {
        while (lx <= rx && isEdge(lx, y)) {
          lx++;
        }
        if (isEdge(lx, y)) {
          break;
        }
        while (lx <= rx && !isEdge(lx, y)) {
          lx++;
        }
        q.push(lx - 1, y);
      }
    };

    doPaint(self, x, y, color, isEdge, scanLine);
  }

  function fillPaint(self, x, y, color) {
    var isEdge = function(x, y) {
      return getPixel(self, x, y) === color;
    };
    var scanLine = function(lx, rx, y, q) {
      while (lx <= rx && lx < self.width) {
        if (!isEdge(lx, y)) {
          q.push(lx, y);
        }
        lx++;
      }
    };

    doPaint(self, x, y, color, isEdge, scanLine);
  }

  function doPaint(self, x, y, color, isEdge, scanLine) {
    function scanRight(x, y) {
      while (x < self.width && !isEdge(x + 1, y)) {
        x++;
      }
      return x;
    }
    function scanLeft(x, y) {
      while (x > 0 && !isEdge(x - 1, y)) {
        x--;
      }
      return x;
    }

    var q = [ x, y ];

    do {
      x = q.shift();
      y = q.shift();

      if (isEdge(x, y)) {
        continue;
      }

      var rx = scanRight(x, y);
      var lx = scanLeft(x, y);

      lineH(self, lx, y, rx - rx, 0, 1, 0, color);

      if (y - 1 >= 0) {
        scanLine(lx, rx, y - 1, q);
      }

      if (y + 1 < self.height) {
        scanLine(lx, rx, y + 1, q);
      }

    } while (q.length);
  }

  function calcColor(self, color, index) {
    if (color & 0x0f00) {
      var tilePattern = self.tilePalette[color >> 8];
      var x = int(index % self.width) % 4;
      var y = int(index / self.width) % 4 * 4;
      var which = tilePattern & 1 << (x + y);

      return which ? (color & 0x0f) : (color & 0xf0) >> 4;
    }
    return color & 0x0f;
  }

  function toColor(color) {
    if (color instanceof Color) {
      return color.valueOf();
    }
    if (typeof color === "number") {
      return nib(color);
    }
    return 0;
  }

  function toRGB(self) {
    var result = new Uint8Array(self.width * self.height * 3);
    var data = self.data;
    var colorPalette = self.colorPalette;

    var k = 0;
    for (var i = 0, imax = data.length; i < imax; i++) {
      var paletteIndex = calcColor(self, data[i], i) * 3;
      result[k++] = colorPalette[paletteIndex    ];
      result[k++] = colorPalette[paletteIndex + 1];
      result[k++] = colorPalette[paletteIndex + 2];
    }

    return result;
  }

  function toRGBA(self, alpha) {
    var result = new Uint8Array(self.width * self.height * 4);
    var data = self.data;
    var colorPalette = self.colorPalette;

    var k = 0;
    for (var i = 0, imax = data.length; i < imax; i++) {
      var paletteIndex = calcColor(self, data[i], i) * 3;
      result[k++] = colorPalette[paletteIndex    ];
      result[k++] = colorPalette[paletteIndex + 1];
      result[k++] = colorPalette[paletteIndex + 2];
      result[k++] = alpha;
    }

    return result;
  }

  function toIndexColor(self) {
    var result = new Uint8Array(self.width * self.height);
    var data = self.data;

    for (var i = 0, imax = data.length; i < imax; i++) {
      var paletteIndex = calcColor(self, data[i], i);
      result[i] = paletteIndex;
    }

    return result;
  }

  function Canvas(width, height) {
    width  = int(defaults(width , 640));
    height = int(defaults(height, 400));

    var self = {
      data  : new Uint16Array(width * height),
      width : width,
      height: height,
      colorPalette: new Uint8Array(defaultColorPalette),
      tilePalette : new Uint16Array(defaultTilePalette)
    };

    this.getWidth = function() {
      return width;
    };
    this.getHeight = function() {
      return height;
    };
    this.getColor = function(index) {
      return getColor(self, nib(index));
    };
    this.setColor = function(index, rgb) {
      setColor(self, nib(index), int(rgb));
      return this;
    };
    this.getTile = function(index) {
      return getTile(self, index);
    };
    this.setTile = function(index, pattern) {
      setTile(self, nib(index), int(pattern));
      return this;
    };
    this.clear = function(color) {
      clear(self, toColor(color));
      return this;
    };
    this.dot = function(x, y, color) {
      dot(self, int(x), int(y), toColor(color));
      return this;
    };
    this.line = function(x1, y1, x2, y2, color) {
      line(self, int(x1), int(y1), int(x2), int(y2), toColor(color));
      return this;
    };
    this.rect = function(x, y, width, height, color, filled) {
      rect(self, int(x), int(y), int(width), int(height), toColor(color), !!filled);
      return this;
    };
    this.circle = function(cx, cy, r, color, filled) {
      circle(self, int(cx), int(cy), int(r), toColor(color), !!filled);
      return this;
    };
    this.ellipse = function(cx, cy, rx, ry, color, filled) {
      ellipse(self, int(cx), int(cy), int(rx), int(ry), toColor(color), !!filled);
      return this;
    };
    this.text = function(str, x, y, color) {
      text(self, String(str), int(x), int(y), toColor(color));
      return this;
    };
    this.plotter = function(x, y, color) {
      return new Plotter(this, int(x), int(y), toColor(color));
    };
    this.paint = function(x, y, color, filled) {
      paint(self, int(x), int(y), toColor(color), !!filled);
      return this;
    };
    this.toRGB = function() {
      return toRGB(self);
    };
    this.toRGBA = function(alpha) {
      return toRGBA(self, int(defaults(alpha, 255)));
    };
    this.toIndexColor = function() {
      return toIndexColor(self);
    };
  }

  function Plotter(canvas, x, y , color) {
    var self = {
      canvas: canvas,
      x     : x,
      y     : y,
      color : color
    };

    this.getX = function() {
      return self.x;
    };
    this.getY = function() {
      return self.y;
    };
    this.moveTo = function(x, y) {
      self.x = int(x);
      self.y = int(y);

      return this;
    };
    this.lineTo = function(x, y) {
      var x1 = self.x;
      var x2 = int(x);
      var y1 = self.y;
      var y2 = int(y);

      self.canvas.line(x1, y1, x2, y2, self.color);
      self.x = x2;
      self.y = y2;

      return this;
    };
    this.moveToRel = function(x, y) {
      return this.moveTo(self.x + int(x), self.y + int(y));
    };
    this.lineToRel = function(x, y) {
      return this.lineTo(self.x + int(x), self.y + int(y));
    };
  }

  function Color(color1, color2, tileIndex) {
    color1 = nib(color1);
    color2 = nib(color2);
    tileIndex = nib(tileIndex);

    if (color1 === color2) {
      tileIndex = 0;
    }
    if (tileIndex === 0) {
      color2 = 0;
    }

    var color = (color1) | (color2 << 4) | (tileIndex << 8);

    this.valueOf = function() {
      return color;
    };
  }

  var exports = {
    version: "0.0.1",
    Canvas : Canvas,
    Color  : Color
  };

  // istanbul ignore else
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = exports;
  } else if (typeof global.define === "function" && global.define.amd) {
    // AMD
    global.define(function() {
      return exports;
    });
  } else {
    // Other environment
    global.gretro  = exports;
  }

})(this.self || global);
