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
