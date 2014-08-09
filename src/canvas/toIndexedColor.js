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
