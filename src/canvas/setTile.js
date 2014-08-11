"use strict";

module.exports = function(gr, _) {
  /**
   * setTile
   *
   * @param {int} index
   * @param {int} pattern
   */
  gr.Canvas.addMethod("setTile", function(index, pattern) {
    index   = index   & 31;
    pattern = pattern & 0xffff;

    if (!_.inRange(index, 0, 15)) {
      this.$.tilePalette[index] = pattern;
    }
  });
};
