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
      var colorIndex = color.valueOf(x, y);
      if (colorIndex !== -1) {
        $.data[y * width + x] = colorIndex & 15;
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
      var colorIndex = color.valueOf(x, y);
      if (colorIndex !== -1) {
        var paletteIndex = colorIndex * 3;
        var colorPalette = $.colorPalette;
        var index = (y * width + x) * 3;

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
      var colorIndex = color.valueOf(x, y);
      if (colorIndex !== -1) {
        var paletteIndex = colorIndex * 3;
        var colorPalette = $.colorPalette;
        var index = (y * width + x) * 4;

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
