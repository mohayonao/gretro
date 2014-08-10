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
