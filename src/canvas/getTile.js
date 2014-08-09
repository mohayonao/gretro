"use strict";

module.exports = function(gr) {
  /**
   * getTile
   *
   * @param {int}
   * @return {int} tile pattern
   */
  gr.Canvas.addMethod("getTile", function(index) {
    return this.$.tilePalette[index & 15];
  });
};
