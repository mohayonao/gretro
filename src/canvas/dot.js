"use strict";

module.exports = function(gr, _) {
  /**
   * dot
   *
   * @param {int} x
   * @param {int} y
   */
  gr.Canvas.addMethod("dot", function(x, y) {
    x = x|0;
    y = y|0;

    _.stroke(this, function(color) {
      _.putPixel(this, x|0, y|0, color);
    });
  });
};
