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

    if (_.inRange(x, 0, this.$.width - 1) && _.inRange(y, 0, this.$.height - 1)) {
      return this.$.data[y * this.$.width + x];
    }

    return -1;
  });
};
