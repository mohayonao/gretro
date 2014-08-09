"use strict";

module.exports = function(gr) {
  /**
   * setTile
   *
   * @param {int}
   * @param {int}
   */
  gr.Canvas.addMethod("setTile", function(index, pattern) {
    index   &= 15;
    pattern &= 0xffff;

    if (index !== 0) {
      this.$.tilePalette[index] = pattern;
    }
  });
};
