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
