"use strict";

module.exports = function(gr) {
  /**
   *  clip
   *
   *  @param {int} x1
   *  @param {int} y1
   *  @param {int} x2
   *  @param {int} y2
   */
  gr.Canvas.addMethod("clip", function(x1, y1, x2, y2) {
    x1 = x1|0;
    y1 = y1|0;
    x2 = x2|0;
    y2 = y2|0;

    this.$.minX = Math.max(0, Math.min(x1, x2));
    this.$.minY = Math.max(0, Math.min(y1, y2));
    this.$.maxX = Math.min(Math.max(x1, x2) - 1, this.$.width  - 1);
    this.$.maxY = Math.min(Math.max(y1, y2) - 1, this.$.height - 1);
  });
};
