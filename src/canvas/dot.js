"use strict";

module.exports = function(gr, _) {
  /**
   * dot
   *
   * @param {int}
   * @param {int}
   */
  gr.Canvas.addMethod("dot", function(x, y) {
    _.stroke(this, function(color) {
      _.putPixel(this, x|0, y|0, color);
    });
  });
};
