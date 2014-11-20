(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require("./src/gretro");

},{"./src/gretro":41}],2:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * arc
   *
   * @param {int} cx
   * @param {int} cy
   * @param {int} rx
   * @param {int} ry
   * @param {int} start
   * @param {int} stop
   * @param {int} mode
   */
  gr.Canvas.addMethod("arc", function() {
    throw new Error("Canvas#arc is not implemented yet.");
  });
};

},{}],3:[function(require,module,exports){
"use strict";

var dollar = require("./dollar");

module.exports = function(gr, _) {
  /**
   * Canvas
   *
   * @param  {int} [width=640]
   * @param  {int} [height=400]
   * @param  {Uint8Array} [buffer]
   * @return {Canvas}
   */
  function Canvas(width, height, buffer) {
    width  = _.defaults(width , 640)|0;
    height = _.defaults(height, 400)|0;

    if (Canvas.isCanvasRGB(width, height, buffer)) {
      return new CanvasRGB(width, height, buffer);
    }
    if (Canvas.isCanvasRGBA(width, height, buffer)) {
      return new CanvasRGBA(width, height, buffer);
    }

    var $ = dollar(width, height, 1, buffer);

    $.putPixel = function(x, y, color) {
      var index = y * width + x;

      if ($.mask && $.mask[index] === 0) {
        return;
      }

      var colorIndex = color.valueOf(x, y);

      if (colorIndex !== -1) {
        $.data[index] = colorIndex & 15;
      }
    };

    this.$ = $;
  }

  Canvas.isCanvasRGB = function(width, height, buffer) {
    return buffer && buffer.length === width * height * 3;
  };

  Canvas.isCanvasRGBA = function(width, height, buffer) {
    return buffer && buffer.length === width * height * 4;
  };

  function CanvasRGB(width, height, buffer) {
    width  = _.defaults(width , 640)|0;
    height = _.defaults(height, 400)|0;

    var $ = dollar(width, height, 3, buffer);

    $.putPixel = function(x, y, color) {
      var index = y * width + x;

      if ($.mask && $.mask[index] === 0) {
        return;
      }

      var colorIndex = color.valueOf(x, y);

      if (colorIndex !== -1) {
        var paletteIndex = colorIndex * 3;
        var colorPalette = $.colorPalette;

        index *= 3;
        $.data[index    ] = colorPalette[paletteIndex    ];
        $.data[index + 1] = colorPalette[paletteIndex + 1];
        $.data[index + 2] = colorPalette[paletteIndex + 2];
      }
    };

    this.$ = $;
  }
  _.extend(CanvasRGB, Canvas);

  function CanvasRGBA(width, height, buffer) {
    width  = _.defaults(width , 640)|0;
    height = _.defaults(height, 400)|0;

    var $ = dollar(width, height, 4, buffer);

    $.putPixel = function(x, y, color) {
      var index = y * width + x;

      if ($.mask && $.mask[index] === 0) {
        return;
      }

      var colorIndex = color.valueOf(x, y);

      if (colorIndex !== -1) {
        var paletteIndex = colorIndex * 3;
        var colorPalette = $.colorPalette;

        index *= 4;
        $.data[index    ] = colorPalette[paletteIndex    ];
        $.data[index + 1] = colorPalette[paletteIndex + 1];
        $.data[index + 2] = colorPalette[paletteIndex + 2];
      }
    };

    this.$ = $;
  }
  _.extend(CanvasRGBA, CanvasRGB);

  gr.Canvas     = Canvas;
  gr.CanvasRGB  = CanvasRGB;
  gr.CanvasRGBA = CanvasRGBA;

  Canvas.addMethod = function(name, method) {
    _.addMethod(Canvas.prototype, name, method);
  };
  CanvasRGB.addMethod = function(name, method) {
    _.addMethod(CanvasRGB.prototype, name, method);
  };
  CanvasRGBA.addMethod = function(name, method) {
    _.addMethod(CanvasRGBA.prototype, name, method);
  };
};

},{"./dollar":9}],4:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * circle
   *
   * @param {int} cx
   * @param {int} cy
   * @param {int} r
   */
  gr.Canvas.addMethod("circle", function(cx, cy, r) {
    cx = cx|0;
    cy = cy|0;
    r  = r |0;

    _.fill(this, function(color) {
      fill(this, cx, cy, r, color);
    });
    _.stroke(this, function(color) {
      stroke(this, cx, cy, r, color);
    });
  });

  function perform(cx, cy, r, delegate) {
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

  function fill(that, cx, cy, r, color) {
    perform(cx, cy, r, function(x, y) {
      _.putLine(that, cx - x, cx + x, cy - y, color);
      _.putLine(that, cx - x, cx + x, cy + y, color);
      _.putLine(that, cx - y, cx + y, cy - x, color);
      _.putLine(that, cx - y, cx + y, cy + x, color);
    });
  }

  function stroke(that, cx, cy, r, color) {
    perform(cx, cy, r, function(x, y) {
      _.putPixel(that, cx + x, cy + y, color);
      _.putPixel(that, cx - x, cy + y, color);
      _.putPixel(that, cx + x, cy - y, color);
      _.putPixel(that, cx - x, cy - y, color);
      _.putPixel(that, cx + y, cy + x, color);
      _.putPixel(that, cx - y, cy + x, color);
      _.putPixel(that, cx + y, cy - x, color);
      _.putPixel(that, cx - y, cy - x, color);
    });
  }
};

},{}],5:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * clear
   */
  gr.Canvas.addMethod("clear", function() {
    _.fill(this, function(color) {
      var width  = this.$.width;
      var height = this.$.height;

      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          this.$.putPixel(x, y, color);
        }
      }
    });
  });
};

},{}],6:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   *  clip
   *
   *  @param {int} x1
   *  @param {int} y1
   *  @param {int} x2
   *  @param {int} y2
   */
  gr.Canvas.addMethod("clip", function(x1, y1, x2, y2) {
    x1 = x1|0;
    y1 = y1|0;
    x2 = x2|0;
    y2 = y2|0;

    this.$.minX = Math.max(0, Math.min(x1, x2));
    this.$.minY = Math.max(0, Math.min(y1, y2));
    this.$.maxX = Math.min(Math.max(x1, x2) - 1, this.$.width  - 1);
    this.$.maxY = Math.min(Math.max(y1, y2) - 1, this.$.height - 1);
  });
};

},{}],7:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * clone
   *
   * @return {Canvas}
   */
  gr.Canvas.addMethod("clone", function() {
    var newInstance = new gr.Canvas(
      this.$.width, this.$.height, new Uint8Array(this.$.data)
    );

    newInstance.$.strokeColor  = this.$.strokeColor;
    newInstance.$.fillColor    = this.$.fillColor;
    newInstance.$.colorPalette.set(this.$.colorPalette);
    newInstance.$.tilePalette.set(this.$.tilePalette);

    return newInstance;
  });
};

},{}],8:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * copy
   *
   * @param {int} x1
   * @param {int} y1
   * @param {int} x2
   * @param {int} y2
   * @return {Canvas}
   */
  gr.Canvas.addMethod("copy", function(x1, y1, x2, y2) {
    x1 = x1|0;
    y1 = y1|0;
    x2 = x2|0;
    y2 = y2|0;

    var params = copy(this.$, x1, y1, x2, y2);
    var newInstance = new gr.Canvas(params[0], params[1], params[2]);

    newInstance.$.colorPalette.set(this.$.colorPalette);
    newInstance.$.tilePalette.set(this.$.tilePalette);

    return newInstance;
  });

  function perform($, scanY, scanX, width, height) {
    var dstData = new Uint8Array(width * height);

    for (var i = 0; i < height; i++) {
      dstData.set(scanX(scanY(i)), i * width);
    }

    return [ width, height, dstData ];
  }

  function copy($, x1, y1, x2, y2) {
    x1 = Math.max(0, Math.min(x1, $.width - 1));
    x2 = Math.max(0, Math.min(x2, $.width - 1));
    y1 = Math.max(0, Math.min(y1, $.height - 1));
    y2 = Math.max(0, Math.min(y2, $.height - 1));

    var width  = Math.abs(x2 - x1) + 1;
    var height = Math.abs(y2 - y1) + 1;
    var scanY  = (y1 <= y2) ?
      scanFromTop(x1, y1, $.width) : scanFromBottom(x1, y1, $.width);
    var scanX  = (x1 <= x2) ?
      scanToRight($.data, width, $.pixelSize) : scanToLeft($.data, width, $.pixelSize);

    return perform($, scanY, scanX, width, height);
  }

  function scanFromTop(x, y, width) {
    return function(i) {
      return (y + i) * width + x;
    };
  }

  function scanFromBottom(x, y, width) {
    return function(i) {
      return (y - i) * width + x;
    };
  }

  function scanToRight(data, width, pixelSize) {
    return function(index) {
      return data.subarray(index * pixelSize, (index + width) * pixelSize);
    };
  }

  function scanToLeft(data, width, pixelSize) {
    return function(index) {
      var result = new Uint8Array(width * pixelSize);

      for (var i = 0; i < width; i++) {
        for (var j = 0; j < pixelSize; j++) {
          result[i * pixelSize + j] = data[(index - i) * pixelSize + j];
        }
      }

      return result;
    };
  }
};

},{}],9:[function(require,module,exports){
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
  0x0000, 0x0000, 0x0000, 0x0000,
  0x0000, 0x0000, 0x0000, 0x0000,
  0x0000, 0x0000, 0x0000, 0x0000,
  0x0000, 0x0000, 0x0000, 0x0000,
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

  if (buffer instanceof Uint8ClampedArray || buffer instanceof Uint8Array) {
    data.data = buffer;
  } else {
    data.data = new Uint8Array(width * height * pixelSize);
  }

  return data;
};

},{}],10:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * draw
   *
   * @param {function} fn
   * @param {object}   [ctx]
   * @param {...*}
   */
  gr.Canvas.addMethod("draw", function(fn) {
    if (typeof fn === "function") {
      var saved = {};

      assignWithKeys(saved, this.$, this.$.storableKeys);

      var result = fn.apply(this, _.slice(arguments, 1));

      assignWithKeys(this.$, saved, this.$.storableKeys);

      return result === undefined ? this : result;
    }
  });

  function assignWithKeys(dst, src, keys) {
    keys.forEach(function(key) {
      dst[key] = src[key];
    });
  }
};

},{}],11:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * ellipse
   *
   * @param {int} cx
   * @param {int} cy
   * @param {int} rx
   * @param {int} ry
   */
  gr.Canvas.addMethod("ellipse", function(cx, cy, rx, ry) {
    cx = cx|0;
    cy = cy|0;
    rx = rx|0;
    ry = ry|0;

    _.fill(this, function(color) {
      fill(this, cx, cy, rx, ry, color);
    });
    _.stroke(this, function(color) {
      stroke(this, cx, cy, rx, ry, color);
    });
  });

  function perform(cx, cy, rx, ry, delegate) {
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

  function fill(that, cx, cy, rx, ry, color) {
    perform(cx, cy, rx, ry, function(x, y) {
      _.putLine(that, cx - x, cx + x, cy + y, color);
      _.putLine(that, cx - x, cx + x, cy - y, color);
    });
  }

  function stroke(that, cx, cy, rx, ry, color) {
    perform(cx, cy, rx, ry, function(x, y) {
      _.putPixel(that, cx + x, cy + y, color);
      _.putPixel(that, cx - x, cy + y, color);
      _.putPixel(that, cx + x, cy - y, color);
      _.putPixel(that, cx - x, cy - y, color);
    });
  }
};

},{}],12:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * fill
   *
   * @param {color} color
   */
  gr.Canvas.addMethod("fill", function(color) {
    this.$.fillColor = _.colorize(color, this.$.tilePalette);
  });
};

},{}],13:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * getColor
   *
   * @param {int} index
   * @return {int} RGB hex code
   */
  gr.Canvas.addMethod("getColor", function(index) {
    index = (index & 15) * 3;
    return _.rgb2num(
      this.$.colorPalette[index    ],
      this.$.colorPalette[index + 1],
      this.$.colorPalette[index + 2]
    );
  });
};

},{}],14:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * getColorIndex
   *
   * @param {int} x
   * @param {int} y
   * @return {int} color index
   */
  gr.Canvas.addMethod("getColorIndex", function(x, y) {
    x = x|0;
    y = y|0;

    if (_.inCanvas(this, x, y)) {
      return this.$.data[y * this.$.width + x];
    }

    return -1;
  });

  gr.CanvasRGB.addMethod("getColorIndex", function() {
    throw new Error("CanvasRGB is not supported #getColorIndex");
  });
};

},{}],15:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * getHeight
   *
   * @return {int} height
   */
  gr.Canvas.addMethod("getHeight", function() {
    return this.$.height;
  });
};

},{}],16:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * getRGB
   *
   * @param {int} x
   * @param {int} y
   * @return {int} rgb
   */
  gr.Canvas.addMethod("getRGB", function(x, y) {
    x = x|0;
    y = y|0;

    if (_.inCanvas(this, x, y)) {
      var index = y * this.$.width + x;
      var paletteIndex = this.$.data[index] * 3;
      var colorPalette = this.$.colorPalette;

      return _.rgb2num(
        colorPalette[paletteIndex    ],
        colorPalette[paletteIndex + 1],
        colorPalette[paletteIndex + 2]
      );
    }

    return -1;
  });

  gr.CanvasRGB.addMethod("getRGB", function(x, y) {
    x = x|0;
    y = y|0;

    if (_.inCanvas(this, x, y)) {
      var index = (y * this.$.width + x) * this.$.pixelSize;

      return _.rgb2num(
        this.$.data[index    ],
        this.$.data[index + 1],
        this.$.data[index + 2]
      );
    }

    return -1;
  });
};

},{}],17:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * getRGBA
   *
   * @param {int} x
   * @param {int} y
   * @param {int} [alpha=255]
   * @return {int} rgb
   */
  gr.Canvas.addMethod("getRGBA", function(x, y, alpha) {
    x = x|0;
    y = y|0;
    alpha = _.defaults(alpha, 255)|0;

    if (_.inCanvas(this, x, y)) {
      var index = y * this.$.width + x;
      var paletteIndex = this.$.data[index] * 3;
      var colorPalette = this.$.colorPalette;

      return rgba(_.rgb2num(
        colorPalette[paletteIndex    ],
        colorPalette[paletteIndex + 1],
        colorPalette[paletteIndex + 2]
      ), alpha);
    }

    return -1;
  });

  gr.CanvasRGB.addMethod("getRGBA", function(x, y, alpha) {
    x = x|0;
    y = y|0;
    alpha = _.defaults(alpha, 255)|0;

    if (_.inCanvas(this, x, y)) {
      var index = (y * this.$.width + x) * this.$.pixelSize;

      return rgba(_.rgb2num(
        this.$.data[index    ],
        this.$.data[index + 1],
        this.$.data[index + 2]
      ), alpha);
    }

    return -1;
  });

  gr.CanvasRGBA.addMethod("getRGBA", function(x, y) {
    x = x|0;
    y = y|0;

    if (_.inCanvas(this, x, y)) {
      var index = (y * this.$.width + x) * this.$.pixelSize;

      return rgba(_.rgb2num(
        this.$.data[index    ],
        this.$.data[index + 1],
        this.$.data[index + 2]
      ), this.$.data[index + 3]);
    }

    return -1;
  });

  function rgba(rgb, a) {
    return (rgb + (a << 24)) >>> 0;
  }
};

},{}],18:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * getRawData
   *
   * @return {Uint8Array}
   */
  gr.Canvas.addMethod("getRawData", function() {
    return this.$.data;
  });
};

},{}],19:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * getTile
   *
   * @param {int}
   * @return {int} tile pattern
   */
  gr.Canvas.addMethod("getTile", function(index) {
    return this.$.tilePalette[index & 31];
  });
};

},{}],20:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   *  getWidth
   *
   * @return {int} width
   */
  gr.Canvas.addMethod("getWidth", function() {
    return this.$.width;
  });
};

},{}],21:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  gr.use(require("./canvas"));
  gr.use(require("./getRawData"));
  gr.use(require("./getHeight"));
  gr.use(require("./getWidth"));
  gr.use(require("./getColor"));
  gr.use(require("./setColor"));
  gr.use(require("./getTile"));
  gr.use(require("./setTile"));
  gr.use(require("./getColorIndex"));
  gr.use(require("./getRGB"));
  gr.use(require("./getRGBA"));
  gr.use(require("./stroke"));
  gr.use(require("./noStroke"));
  gr.use(require("./fill"));
  gr.use(require("./noFill"));
  gr.use(require("./clip"));
  gr.use(require("./noClip"));
  gr.use(require("./mask"));
  gr.use(require("./noMask"));
  gr.use(require("./clear"));
  gr.use(require("./draw"));
  gr.use(require("./point"));
  gr.use(require("./line"));
  gr.use(require("./polygon"));
  gr.use(require("./triangle"));
  gr.use(require("./quad"));
  gr.use(require("./rect"));
  gr.use(require("./arc"));
  gr.use(require("./circle"));
  gr.use(require("./ellipse"));
  gr.use(require("./copy"));
  gr.use(require("./paste"));
  gr.use(require("./clone"));
  gr.use(require("./toMask"));
  gr.use(require("./toIndexedColor"));
  gr.use(require("./toRGB"));
  gr.use(require("./toRGBA"));
};

},{"./arc":2,"./canvas":3,"./circle":4,"./clear":5,"./clip":6,"./clone":7,"./copy":8,"./draw":10,"./ellipse":11,"./fill":12,"./getColor":13,"./getColorIndex":14,"./getHeight":15,"./getRGB":16,"./getRGBA":17,"./getRawData":18,"./getTile":19,"./getWidth":20,"./line":22,"./mask":23,"./noClip":24,"./noFill":25,"./noMask":26,"./noStroke":27,"./paste":28,"./point":29,"./polygon":30,"./quad":31,"./rect":32,"./setColor":33,"./setTile":34,"./stroke":35,"./toIndexedColor":36,"./toMask":37,"./toRGB":38,"./toRGBA":39,"./triangle":40}],22:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   *  line
   *
   *  @param {int} x1
   *  @param {int} y1
   *  @param {int} x2
   *  @param {int} y2
   */
  gr.Canvas.addMethod("line", function(x1, y1, x2, y2) {
    x1 = x1|0;
    y1 = y1|0;
    x2 = x2|0;
    y2 = y2|0;

    _.stroke(this, function(color) {
      if (y1 === y2) {
        lineH(this.$, Math.min(x1, x2), Math.max(x1, x2), y1, color);
      } else if (x1 === x2) {
        lineV(this.$, Math.min(y1, y2), Math.max(y1, y2), x1, color);
      } else {
        var pt1 = [ x1, y1 ];
        var pt2 = [ x2, y2 ];

        if (clip(this.$, pt1, pt2)) {
          lineD(this.$, pt1[X], pt1[Y], pt2[X], pt2[Y], color);
        }
      }
    });
  });

  var X = 0;
  var Y = 1;
  var LEFT   = 1;
  var RIGHT  = 2;
  var TOP    = 4;
  var BOTTOM = 8;

  function lineH($, x1, x2, y, color) {
    if (_.inRange(y, $.minY, $.maxY)) {
      x1 = Math.max(x1, $.minX);
      x2 = Math.min(x2, $.maxX);

      while (x1 <= x2) {
        $.putPixel(x1++, y, color);
      }
    }
  }

  function lineV($, y1, y2, x, color) {
    if (_.inRange(x, $.minX, $.maxX)) {
      y1 = Math.max(y1, $.minY);
      y2 = Math.min(y2, $.maxY);

      while (y1 <= y2) {
        $.putPixel(x, y1++, color);
      }
    }
  }

  function lineX($, x, y, dx, dy, sx, sy, color) {
    var e = -dx;

    for (var i = 0; i <= dx; x += sx, i++) {
      $.putPixel(x, y, color);

      e += 2 * dy;
      if (e >= 0)  {
        y += sy;
        e -= 2 * dx;
      }
    }
  }

  function lineY($, x, y, dx, dy, sx, sy, color) {
    var e = -dy;

    for (var i = 0; i <= dy; y += sy, i++) {
      $.putPixel(x, y, color);

      e += 2 * dx;
      if (e >= 0) {
        x += sx;
        e -= 2 * dy;
      }
    }
  }

  function lineD($, x1, y1, x2, y2, color) {
    var dx = Math.abs(x1 - x2);
    var dy = Math.abs(y1 - y2);
    var sx = x1 < x2 ? +1 : -1;
    var sy = y1 < y2 ? +1 : -1;

    if (dx >= dy) {
      lineX($, x1, y1, dx, dy, sx, sy, color);
    } else {
      lineY($, x1, y1, dx, dy, sx, sy, color);
    }
  }

  function calcSeqCode($, pt) {
    var code = 0;

    if (pt[X] < $.minX) {
      code += LEFT;
    }
    if ($.maxX < pt[X]) {
      code += RIGHT;
    }
    if (pt[Y] < $.minY) {
      code += TOP;
    }
    if ($.maxY < pt[Y]) {
      code += BOTTOM;
    }

    return code;
  }

  function calcIntersectX($, pt1, pt2, clipX, dest) {
    var cy = ((pt2[Y] - pt1[Y]) * (clipX - pt1[X]) / (pt2[X] - pt1[X]) + pt1[Y])|0;

    if (cy < $.minY || $.maxY < cy) {
      return false;
    }

    dest[X] = clipX;
    dest[Y] = cy;

    return true;
  }

  function calcIntersectY($, pt1, pt2, clipY, dest) {
    var cx = ((pt2[X] - pt1[X]) * (clipY - pt1[Y]) / (pt2[Y] - pt1[Y]) + pt1[X])|0;

    if (cx < $.minX || $.maxX < cx) {
      return false;
    }

    dest[X] = cx;
    dest[Y] = clipY;

    return true;
  }

  function calcClippedPoint($, code, pt1, pt2, dest) {
    if ((code & LEFT) !== 0) {
      // in outside the left end
      if (calcIntersectX($, pt1, pt2, $.minX, dest)) {
        return true;
      }
    }

    if ((code & RIGHT) !== 0) {
      // in outside the right end
      if (calcIntersectX($, pt1, pt2, $.maxX, dest)) {
        return true;
      }
    }

    if ((code & TOP) !== 0) {
      // in outside the top end
      if (calcIntersectY($, pt1, pt2, $.minY, dest)) {
        return true;
      }
    }

    if ((code & BOTTOM) !== 0) {
      // in outside the top bottom
      if (calcIntersectY($, pt1, pt2, $.maxY, dest)) {
        return true;
      }
    }

    // in the case of invisible

    return false;
  }

  function clip($, pt1, pt2) {
    var code1 = calcSeqCode($, pt1);
    var code2 = calcSeqCode($, pt2);

    if (code1 === 0 && code2 === 0) {
      return true;
    }

    if ((code1 & code2) !== 0) {
      return false;
    }

    if (code1 !== 0) {
      if (!calcClippedPoint($, code1, pt1, pt2, pt1)) {
        return false;
      }
    }

    if (code2 !== 0) {
      calcClippedPoint($, code2, pt1, pt2, pt2);
    }

    return true;
  }
};

},{}],23:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * mask
   *
   * @param {Uint8Array} mask
   */
  gr.Canvas.addMethod("mask", function(mask) {
    if (mask instanceof gr.Canvas) {
      mask = mask.$.data;
    }
    this.$.mask = mask;
  });
};

},{}],24:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   *  noClip
   */
  gr.Canvas.addMethod("noClip", function() {
    this.$.minX = 0;
    this.$.minY = 0;
    this.$.maxX = this.$.width  - 1;
    this.$.maxY = this.$.height - 1;
  });
};

},{}],25:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   *  noFill
   */
  gr.Canvas.addMethod("noFill", function() {
    this.$.fillColor = -1;
  });
};

},{}],26:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   *  noMask
   */
  gr.Canvas.addMethod("noMask", function() {
    this.$.mask = null;
  });
};

},{}],27:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   *  noStroke
   */
  gr.Canvas.addMethod("noStroke", function() {
    this.$.strokeColor = -1;
  });
};

},{}],28:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   *  paste
   *
   *  @param {Canvas} src
   *  @param {int}    [x=0]
   *  @param {int}    [y=0]
   */
  gr.Canvas.addMethod("paste", function(src, x, y) {
    x = x|0;
    y = y|0;

    if (src && this.constructor === src.constructor) {
      var srcData = src.$.data;
      var dstData = this.$.data;
      var mask    = this.$.mask;
      var pixelSize = this.$.pixelSize;
      var clipped   = clip(x, y, src.$.width, src.$.height, this.$.width, this.$.height);

      var fn = null;
      if (mask) {
        fn = function(srcIndex, dstIndex, width) {
          for (var i = 0; i < width; i++) {
            if (mask[dstIndex] !== 0) {
              var srcBuf = srcData.subarray(
                srcIndex * pixelSize, (srcIndex + 1) * pixelSize
              );
              dstData.set(srcBuf, dstIndex * pixelSize);
            }
            srcIndex++;
            dstIndex++;
          }
        };
      } else {
        fn = function(srcIndex, dstIndex, width) {
          var srcBuf = srcData.subarray(
            srcIndex * pixelSize, (srcIndex + width) * pixelSize
          );
          dstData.set(srcBuf, dstIndex * pixelSize);
        };
      }
      perform(src, this, clipped, fn);
    }
  });

  function perform(src, dst, clipped, fn) {
    var srcWidth  = src.$.width;
    var dstWidth  = dst.$.width;
    var width  = clipped.width;
    var height = clipped.height;
    var srcIndex = clipped.srcIndex;
    var dstIndex = (dstWidth * clipped.y) + clipped.x;

    for (var i = 0; i < height; i++) {
      fn(srcIndex, dstIndex, width);
      srcIndex += srcWidth;
      dstIndex += dstWidth;
    }
  }

  function clip(x, y, width, height, dstWidth, dstHeight) {
    var srcIndex = 0;
    var srcWidth = width;

    if (x < 0) {
      width += x;
      srcIndex -= x;
      x = 0;
    }
    if (y < 0) {
      height += y;
      srcIndex -= y * srcWidth;
      y = 0;
    }

    width  = Math.min(width , dstWidth  - x);
    height = Math.min(height, dstHeight - y);

    return { x: x, y: y, width: width, height: height, srcIndex: srcIndex };
  }
};

},{}],29:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * point
   *
   * @param {int} x
   * @param {int} y
   */
  gr.Canvas.addMethod("point", function(x, y) {
    x = x|0;
    y = y|0;

    _.stroke(this, function(color) {
      if (_.inClip(this, x, y)) {
        _.putPixel(this, x, y, color);
      }
    });
  });
};

},{}],30:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * polygon
   *
   * @param {array} vtx
   */
  gr.Canvas.addMethod("polygon", function(vtx) {
    vtx = Array.isArray(vtx) ? vtx.map(function(edge) {
      return [ edge[0]|0, edge[1]|0 ];
    }) : [];

    _.fill(this, function(color) {
      fill(this, toEdge(clipVtx(vtx, this.$.minY, this.$.maxY)), color);
    });
    _.stroke(this, function(color) {
      stroke(this, vtx, color);
    });
  });

  var X  = 0;
  var Y  = 1;
  var Y0 = 1;
  var Y1 = 2;
  var A  = 3;
  var D  = 4;
  var ID = 5;

  function eq(pt1, pt2) {
    return pt1[X] === pt2[X] && pt1[Y] === pt2[Y];
  }

  function angle(pt1, pt2) {
    return (pt2[X] - pt1[X]) / (pt2[Y] - pt1[Y]);
  }

  function clipPoint(pt1, pt2, minY, maxY) {
    var dy = pt2[Y] < minY ? minY - pt1[Y] : maxY - pt1[Y];
    var x  = ((pt2[X] - pt1[X]) * dy / (pt2[Y] - pt1[Y]) + pt1[X])|0;
    var y  = pt2[Y] < minY ? minY : maxY;

    return [ x, y ];
  }

  function clipVtx(vtx, minY, maxY) {
    var result = [];
    var vtxLength = vtx.length;

    for (var i = 1; i <= vtxLength; i++) {
      var pt1 = vtx[i - 1];
      var pt2 = vtx[i % vtxLength];

      if (eq(pt1, pt2)) {
        continue;
      }

      if (_.inRange(pt1[Y], minY, maxY)) {
        if (_.inRange(pt2[Y], minY, maxY)) {
          // case _.inRange(pt1) and _.inRange(pt2)
          result.push(pt1);
        } else {
          // case _.inRange(pt1) and not _.inRange(pt2)
          result.push(pt1, clipPoint(pt1, pt2, minY, maxY));
        }
      } else {
        if (_.inRange(pt2[Y], minY, maxY)) {
          // case not _.inRange(pt1) and _.inRange(pt2)
          result.push(clipPoint(pt2, pt1, minY, maxY));
        } else {
          // case not _.inRange(pt1) and not _.inRange(pt2)
          result.push(clipPoint(pt2, pt1, minY, maxY), clipPoint(pt1, pt2, minY, maxY));
        }
      }
    }

    return result;
  }

  function toEdge(vtx) {
    var result = [];

    if (vtx.length === 0) {
      return result;
    }

    var vtxLength = vtx.length;
    var id = 1;

    for (var i = 0; i < vtxLength; i++) {
      var pt1 = vtx[i].slice();
      var pt2 = vtx[(i + 1) % vtxLength].slice();

      if (pt1[Y] === pt2[Y]) {
        continue;
      }

      var edge = [
        pt1[Y] < pt2[Y] ? pt1[X] : pt2[X],
        0,
        0,
        angle(pt1, pt2),
        pt1[Y] < pt2[Y] ? +1 : -1,
        id++
      ];

      edge[Y0] = Math.min(pt1[Y], pt2[Y]);
      edge[Y1] = Math.max(pt1[Y], pt2[Y]);

      result.push(edge);
    }

    return result;
  }

  function inScanLine(y) {
    return function(edge) {
      return _.inRange(y, edge[Y0], edge[Y1]);
    };
  }

  function sortByX(a, b) {
    return a[X] - b[X];
  }

  function isSameDirection(e1, e2) {
    return e1[D] === e2[D];
  }

  function isAdjacent(e1, e2, len) {
    return Math.abs((e1[ID] % len) - e2[ID]) === 1;
  }

  function removeIfAdjacentSameDirection(_, i, list) {
    return i === 0 ||
      !isSameDirection(list[i], list[i - 1]) ||
      !isAdjacent(list[i], list[i - 1], list.length);
  }

  function fetchX(edge) {
    return edge[X];
  }

  function updateX(edge) {
    edge[X] += edge[A];
  }

  function fill(that, edgeList, color) {
    var minY = that.$.maxY;
    var maxY = that.$.minY;

    edgeList.forEach(function(edge) {
      minY = Math.min(minY, edge[Y0]);
      maxY = Math.max(maxY, edge[Y1]);
    });

    for (var y = minY; y <= maxY; y++) {
      var scanned = edgeList.filter(inScanLine(y));
      var sortedX = scanned.sort(sortByX)
        .filter(removeIfAdjacentSameDirection)
        .map(fetchX);

      for (var i = 1, imax = sortedX.length; i < imax; i += 2) {
        var x1 = sortedX[i - 1];
        var x2 = sortedX[i];
        _.putLine(that, Math.round(x1), Math.round(x2), y, color);
      }

      scanned.forEach(updateX);
    }
  }

  function stroke(that, vtx) {
    var vtxLength = vtx.length;

    for (var i = 0, imax = vtxLength; i < imax; i++) {
      var pt1 = vtx[i];
      var pt2 = vtx[(i + 1) % vtxLength];

      that.line(pt1[X], pt1[Y], pt2[X], pt2[Y]);
    }
  }
};

},{}],31:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * quad
   *
   * @param {int} x1
   * @param {int} y1
   * @param {int} x2
   * @param {int} y2
   * @param {int} x3
   * @param {int} y3
   * @param {int} x4
   * @param {int} y4
   */
  gr.Canvas.addMethod("quad", function(x1, y1, x2, y2, x3, y3, x4, y4) {
    x1 = x1|0;
    y1 = y1|0;
    x2 = x2|0;
    y2 = y2|0;
    x3 = x3|0;
    y3 = y3|0;
    x4 = x4|0;
    y4 = y4|0;

    this.polygon([ [ x1, y1 ], [ x2, y2 ], [ x3, y3 ], [ x4, y4 ] ]);
  });
};

},{}],32:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * rect
   *
   * @param {int} x
   * @param {int} y
   * @param {int} w
   * @param {int} h
   */
  gr.Canvas.addMethod("rect", function(x, y, w, h) {
    x = x|0;
    y = y|0;
    w = w|0;
    h = h|0;

    var dx = Math.abs(w) - 1;
    var dy = Math.abs(h) - 1;
    var sx = w >= 0 ? +1 : -1;
    var sy = h >= 0 ? +1 : -1;
    var x1 = (sx === +1) ? x : x + dx * sx;
    var x2 = (sx === -1) ? x : x + dx * sx;
    var y1 = (sy === +1) ? y : y + dy * sy;
    var y2 = (sy === -1) ? y : y + dy * sy;

    _.fill(this, function(color) {
      fill(this, x1, y1, x2, y2, color);
    });
    _.stroke(this, function(color) {
      stroke(this, x1, y1, x2, y2, color);
    });
  });

  function fill(that, x1, y1, x2, y2, color) {
    for (var y = y1; y <= y2; y++) {
      _.putLine(that, x1, x2, y, color);
    }
  }

  function stroke(that, x1, y1, x2, y2) {
    that.line(x1, y1, x2, y1);
    that.line(x2, y1, x2, y2);
    that.line(x2, y2, x1, y2);
    that.line(x1, y2, x1, y1);
  }
};

},{}],33:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * setColor
   *
   * @param {int}
   * @param {int}
   */
  gr.Canvas.addMethod("setColor", function(index, rgb) {
    index = (index & 15) * 3;
    this.$.colorPalette[index    ] = ((rgb >> 20) & 0x0f) * 0x11;
    this.$.colorPalette[index + 1] = ((rgb >> 12) & 0x0f) * 0x11;
    this.$.colorPalette[index + 2] = ((rgb >>  4) & 0x0f) * 0x11;
  });
};

},{}],34:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * setTile
   *
   * @param {int} index
   * @param {int} pattern
   */
  gr.Canvas.addMethod("setTile", function(index, pattern) {
    index   = index   & 31;
    pattern = pattern & 0xffff;

    if (!_.inRange(index, 0, 15)) {
      this.$.tilePalette[index] = pattern;
    }
  });
};

},{}],35:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * stroke
   *
   * @param {color} color
   */
  gr.Canvas.addMethod("stroke", function(color) {
    this.$.strokeColor = _.colorize(color, this.$.tilePalette);
  });
};

},{}],36:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * toIndexedColor
   *
   * @return {Uint8Array}
   */
  gr.Canvas.addMethod("toIndexedColor", function() {
    return new Uint8Array(this.$.data);
  });

  gr.CanvasRGB.addMethod("toIndexedColor", function() {
    throw new Error("CanvasRGB is not supported #toIndexedColor");
  });
};

},{}],37:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * toMask
   *
   * @return {Uint8Array}
   */
  gr.Canvas.addMethod("toMask", function() {
    var data = this.$.data;
    var mask = new Uint8Array(data.length);

    for (var i = 0, imax = mask.length; i < imax; i++) {
      mask[i] = data[i] ? 15 : 0;
    }

    return mask;
  });

  gr.CanvasRGB.addMethod("toMask", function() {
    throw new Error("CanvasRGB is not supported #toMask");
  });
};

},{}],38:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * toRGB
   *
   * @return {Uint8Array}
   */
  gr.Canvas.addMethod("toRGB", function() {
    var length = this.$.width * this.$.height;
    var result = new Uint8Array(length * 3);
    var data   = this.$.data;
    var width  = this.$.width;
    var height = this.$.height;
    var colorPalette = this.$.colorPalette;

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
  });

  gr.CanvasRGB.addMethod("toRGB", function() {
    return new Uint8Array(this.$.data);
  });

  gr.CanvasRGBA.addMethod("toRGB", function() {
    var length = this.$.width * this.$.height;
    var result = new Uint8Array(length * 3);
    var data   = this.$.data;

    for (var i = 0, j = 0, k = 0; i < length; i++, k++) {
      result[j++] = data[k++];
      result[j++] = data[k++];
      result[j++] = data[k++];
    }

    return result;
  });
};

},{}],39:[function(require,module,exports){
"use strict";

module.exports = function(gr, _) {
  /**
   * toRGBA
   *
   * @param {int} [alpha=255] opacity
   * @return {Uint8Array}
   */
  gr.Canvas.addMethod("toRGBA", function(alpha) {
    alpha = _.defaults(alpha, 255)|0;

    var length = this.$.width * this.$.height;
    var result = new Uint8Array(length * 4);
    var data   = this.$.data;
    var width  = this.$.width;
    var height = this.$.height;
    var colorPalette = this.$.colorPalette;

    var i = 0, j = 0;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var paletteIndex = data[i++] * 3;
        result[j++] = colorPalette[paletteIndex    ];
        result[j++] = colorPalette[paletteIndex + 1];
        result[j++] = colorPalette[paletteIndex + 2];
        result[j++] = alpha;
      }
    }

    return result;
  });

  gr.CanvasRGB.addMethod("toRGBA", function(alpha) {
    alpha = _.defaults(alpha, 255)|0;

    var length = this.$.width * this.$.height;
    var result = new Uint8Array(length * 4);
    var data   = this.$.data;

    for (var i = 0, j = 0, k = 0; i < length; i++) {
      result[j++] = data[k++];
      result[j++] = data[k++];
      result[j++] = data[k++];
      result[j++] = alpha;
    }

    return result;
  });

  gr.CanvasRGBA.addMethod("toRGBA", function() {
    return new Uint8Array(this.$.data);
  });
};

},{}],40:[function(require,module,exports){
"use strict";

module.exports = function(gr) {
  /**
   * triangle
   *
   * @param {int} x1
   * @param {int} y1
   * @param {int} x2
   * @param {int} y2
   * @param {int} x3
   * @param {int} y3
   */
  gr.Canvas.addMethod("triangle", function(x1, y1, x2, y2, x3, y3) {
    x1 = x1|0;
    y1 = y1|0;
    x2 = x2|0;
    y2 = y2|0;
    x3 = x3|0;
    y3 = y3|0;

    this.polygon([ [ x1, y1 ], [ x2, y2 ], [ x3, y3 ] ]);
  });
};

},{}],41:[function(require,module,exports){
(function (global){
"use strict";

var util = require("./utils");
var used = [];

var gretro = {};

gretro.version = "0.2.5";

gretro.use = function(fn) {
  /* istanbul ignore else */
  if (used.indexOf(fn) === -1) {
    fn(gretro, util);
    used.push(fn);
  }
  return gretro;
};

gretro.use(require("./canvas"));

/* istanbul ignore next */
if (typeof global.window !== "undefined") {
  global.window.gretro = gretro;
}

module.exports = gretro;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./canvas":21,"./utils":50}],42:[function(require,module,exports){
"use strict";

/**
 * addMethod
 *
 * @param {object}   ctx
 * @param {string}   name
 * @param {function} method
 */
module.exports = function(ctx, name, method) {
  ctx[name] = function() {
    var result = method.apply(this, arguments);

    return result === undefined ? this : result;
  };

  return this;
};

},{}],43:[function(require,module,exports){
"use strict";

function fromTileItems(items, tilePalette) {
  var color1 = items[0] & 15;
  var color2 = items[1] & 15;
  var tileIndex = items[2] & 31;
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
 *
 * @param {int|array|function} color
 * @param {Uint16Array}        tileIndex
 */
module.exports = function(color, tilePalette) {
  if (typeof color === "number") {
    return color === -1 ? -1 : color & 15;
  }
  if (Array.isArray(color)) {
    return fromTileItems(color, tilePalette);
  }
  if (typeof color === "function") {
    return {
      valueOf: color
    };
  }
  return -1;
};

},{}],44:[function(require,module,exports){
"use strict";

/**
 * defaults
 *
 * @param {any} val
 * @param {any} defaultVal
 */
module.exports = function(val, defaultVal) {
  if (typeof val === "undefined") {
    return defaultVal;
  }
  return val;
};

},{}],45:[function(require,module,exports){
"use strict";

/**
 * extend
 *
 * @param {function} child
 * @param {function} parent
 * @return {function} child
 */
module.exports = function(child, parent) {
  Object.keys(parent).forEach(function(key) {
    child[key] = parent[key];
  });

  function Ctor() {
    this.constructor = child;
  }

  Ctor.prototype = parent.prototype;
  child.prototype = new Ctor();

  return child;
};

},{}],46:[function(require,module,exports){
"use strict";

/**
 * fill
 *
 * @param {Canvas}   cnv
 * @param {function} fn
 */
module.exports = function(cnv, fn) {
  if (cnv.$.fillColor !== -1) {
    fn.call(cnv, cnv.$.fillColor);
  }
};

},{}],47:[function(require,module,exports){
"use strict";

var inRange = require("./inRange");

/**
 * inCanvas
 *
 * @param {Canvas} cnv
 * @param {int}    x
 * @param {int}    y
 */
module.exports = function(cnv, x, y) {
  return inRange(x, 0, cnv.$.width - 1) && inRange(y, 0, cnv.$.height - 1);
};

},{"./inRange":49}],48:[function(require,module,exports){
"use strict";

var inRange = require("./inRange");

/**
 * inClip
 *
 * @param {Canvas} cnv
 * @param {int}    x
 * @param {int}    y
 */
module.exports = function(cnv, x, y) {
  return inRange(x, cnv.$.minX, cnv.$.maxX) && inRange(y, cnv.$.minY, cnv.$.maxY);
};

},{"./inRange":49}],49:[function(require,module,exports){
"use strict";

/**
 * inRange
 *
 * @param {number} num
 * @param {number} min
 * @param {number} max
 */
module.exports = function(num, min, max) {
  return min <= num && num <= max;
};

},{}],50:[function(require,module,exports){
"use strict";

exports.addMethod = require("./addMethod");

exports.extend = require("./extend");

exports.inRange = require("./inRange");

exports.defaults = require("./defaults");

exports.rgb2num = require("./rgb2num");

exports.slice = require("./slice");

exports.colorize = require("./colorize");

exports.inCanvas = require("./inCanvas");

exports.inClip = require("./inClip");

exports.putPixel = require("./putPixel");

exports.putLine = require("./putLine");

exports.stroke = require("./stroke");

exports.fill = require("./fill");

},{"./addMethod":42,"./colorize":43,"./defaults":44,"./extend":45,"./fill":46,"./inCanvas":47,"./inClip":48,"./inRange":49,"./putLine":51,"./putPixel":52,"./rgb2num":53,"./slice":54,"./stroke":55}],51:[function(require,module,exports){
"use strict";

var inRange = require("./inRange");

/**
 * putLine
 *
 * @param {Canvas} cnv
 * @param {int}    x1
 * @param {int}    x2
 * @param {int}    y
 * @param {color}  color
 */
module.exports = function(cnv, x1, x2, y, color) {
  var $ = cnv.$;

  if (inRange(y, $.minY, $.maxY)) {
    x1 = Math.max(x1, $.minX);
    x2 = Math.min(x2, $.maxX);

    while (x1 <= x2) {
      $.putPixel(x1++, y, color);
    }
  }
};

},{"./inRange":49}],52:[function(require,module,exports){
"use strict";

var inRange = require("./inRange");

/**
 * putPixel
 *
 * @param {Canvas} cnv
 * @param {int}    x
 * @param {int}    y
 * @param {color}  color
 */
module.exports = function(cnv, x, y, color) {
  var $ = cnv.$;

  if (inRange(x, $.minX, $.maxX) && inRange(y, $.minY, $.maxY)) {
    $.putPixel(x, y, color);
  }
};

},{"./inRange":49}],53:[function(require,module,exports){
"use strict";

/**
 * rgb2num
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} rgb
 */
module.exports = function(r, g, b) {
  return (r << 16) + (g << 8) + b;
};

},{}],54:[function(require,module,exports){
"use strict";

var slice = Array.prototype.slice;

/**
 * slice
 *
 * @param {array} list
 * @param {int}   [n=0]
 */
module.exports = function(list, n) {
  return slice.call(list, n|0);
};

},{}],55:[function(require,module,exports){
"use strict";

/**
 * stroke
 *
 * @param {Canvas}   cnv
 * @param {function} fn
 */
module.exports = function(cnv, fn) {
  if (cnv.$.strokeColor !== -1) {
    fn.call(cnv, cnv.$.strokeColor);
  }
};

},{}]},{},[1]);
