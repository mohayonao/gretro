"use strict";

module.exports = function(gr, _) {
  /**
   * ellipse
   *
   * @param {int} cx
   * @param {int} cy
   * @param {int} rx
   * @param {int} ry
   */
  gr.Canvas.addMethod("ellipse", function(cx, cy, rx, ry) {
    cx = cx|0;
    cy = cy|0;
    rx = rx|0;
    ry = ry|0;

    _.fill(this, function(color) {
      fill(this, cx, cy, rx, ry, color);
    });
    _.stroke(this, function(color) {
      stroke(this, cx, cy, rx, ry, color);
    });
  });

  function perform(cx, cy, rx, ry, delegate) {
    var x = rx;
    var y = 0;
    var b = Math.pow(rx / ry, 2);
    var d = rx;
    var f = -2 * d +     1 + 2 * b;
    var h = -4 * d + 2 * 1     + b;

    while (x >= 0) {
      delegate(x, y);

      if (f >= 0) {
        x--;
        f -= 4 * x;
        h -= 4 * x - 2;
      }
      if (h < 0) {
        y++;
        f += 4 * b * y + 2 * b;
        h += 4 * b * y;
      }
    }
  }

  function fill(that, cx, cy, rx, ry, color) {
    perform(cx, cy, rx, ry, function(x, y) {
      _.putLine(that, cx - x, cx + x, cy + y, color);
      _.putLine(that, cx - x, cx + x, cy - y, color);
    });
  }

  function stroke(that, cx, cy, rx, ry, color) {
    perform(cx, cy, rx, ry, function(x, y) {
      _.putPixel(that, cx + x, cy + y, color);
      _.putPixel(that, cx - x, cy + y, color);
      _.putPixel(that, cx + x, cy - y, color);
      _.putPixel(that, cx - x, cy - y, color);
    });
  }
};
