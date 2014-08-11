"use strict";

module.exports = function(gr, _) {
  /**
   * point
   *
   * @param {int} x
   * @param {int} y
   */
  gr.Canvas.addMethod("point", function(x, y) {
    x = x|0;
    y = y|0;

    _.stroke(this, function(color) {
      if (_.inClip(this, x, y)) {
        _.putPixel(this, x, y, color);
      }
    });
  });
};
