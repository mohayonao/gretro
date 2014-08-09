"use strict";

module.exports = function(gr, _) {
  /**
   * rect
   *
   * @param {int}
   * @param {int}
   * @param {int}
   * @param {int}
   */
  gr.Canvas.addMethod("rect", function(x, y, w, h) {
    var dx = Math.abs(w) - 1;
    var dy = Math.abs(h) - 1;
    var sx = w >= 0 ? +1 : -1;
    var sy = h >= 0 ? +1 : -1;
    var x1 = (sx === +1) ? x : x + dx * sx;
    var x2 = (sx === -1) ? x : x + dx * sx;
    var y1 = (sy === +1) ? y : y + dy * sy;
    var y2 = (sy === -1) ? y : y + dy * sy;

    _.fill(this, function(color) {
      fill(this, x1, y1, x2, y2, color);
    });
    _.stroke(this, function(color) {
      stroke(this, x1, y1, x2, y2, color);
    });
  });

  function fill(that, x1, y1, x2, y2, color) {
    for (var y = y1; y <= y2; y++) {
      _.putLine(that, x1, x2, y, color);
    }
  }

  function stroke(that, x1, y1, x2, y2) {
    that.line(x1, y1, x2, y1);
    that.line(x2, y1, x2, y2);
    that.line(x2, y2, x1, y2);
    that.line(x1, y2, x1, y1);
  }
};
