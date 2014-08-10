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
