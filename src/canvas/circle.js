"use strict";

module.exports = function(gr, _) {
  /**
   * circle
   *
   * @param {int} cx
   * @param {int} cy
   * @param {int} r
   */
  gr.Canvas.addMethod("circle", function(cx, cy, r) {
    cx = cx|0;
    cy = cy|0;
    r  = r |0;

    _.fill(this, function(color) {
      fill(this, cx, cy, r, color);
    });
    _.stroke(this, function(color) {
      stroke(this, cx, cy, r, color);
    });
  });

  function perform(cx, cy, r, delegate) {
    var x  = r;
    var y  = 0;
    var f  = -3 * r + 3;

    while (x >= y) {
      delegate(x, y);

      if (f >= 0) {
        f -= 4 * (--x);
      }
      f += 4 * (++y) + 2;
    }
  }

  function fill(that, cx, cy, r, color) {
    perform(cx, cy, r, function(x, y) {
      _.putLine(that, cx - x, cx + x, cy - y, color);
      _.putLine(that, cx - x, cx + x, cy + y, color);
      _.putLine(that, cx - y, cx + y, cy - x, color);
      _.putLine(that, cx - y, cx + y, cy + x, color);
    });
  }

  function stroke(that, cx, cy, r, color) {
    perform(cx, cy, r, function(x, y) {
      _.putPixel(that, cx + x, cy + y, color);
      _.putPixel(that, cx - x, cy + y, color);
      _.putPixel(that, cx + x, cy - y, color);
      _.putPixel(that, cx - x, cy - y, color);
      _.putPixel(that, cx + y, cy + x, color);
      _.putPixel(that, cx - y, cy + x, color);
      _.putPixel(that, cx + y, cy - x, color);
      _.putPixel(that, cx - y, cy - x, color);
    });
  }
};
