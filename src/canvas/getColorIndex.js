"use strict";

module.exports = function(gr, _) {
  /**
   * getColorIndex
   *
   * @param {int}
   * @param {int}
   */
  gr.Canvas.addMethod("getColorIndex", function(x, y) {
    if (_.inRange(x, 0, this.$.width-1) && _.inRange(y, 0, this.$.height-1)) {
      return this.$.data[y * this.$.width + x];
    }
    return -1;
  });
};
