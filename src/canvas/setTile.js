"use strict";

module.exports = function(gr) {
  /**
   * setTile
   *
   * @param {int} index
   * @param {int} pattern
   */
  gr.Canvas.addMethod("setTile", function(index, pattern) {
    index   = index   & 15;
    pattern = pattern & 0xffff;

    if (index !== 0) {
      this.$.tilePalette[index] = pattern;
    }
  });
};
