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
