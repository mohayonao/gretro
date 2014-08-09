"use strict";

module.exports = function(gr) {
  /**
   * getColor
   *
   * @param {int}
   */
  gr.Canvas.addMethod("getColor", function(index) {
    index = (index & 15) * 3;
    return (this.$.colorPalette[index]) +
           (this.$.colorPalette[index + 1] <<  8) +
           (this.$.colorPalette[index + 2] << 16);
  });
};
