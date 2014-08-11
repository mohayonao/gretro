"use strict";

module.exports = function(gr) {
  /**
   * triangle
   *
   * @param {int} x1
   * @param {int} y1
   * @param {int} x2
   * @param {int} y2
   * @param {int} x3
   * @param {int} y3
   */
  gr.Canvas.addMethod("triangle", function(x1, y1, x2, y2, x3, y3) {
    x1 = x1|0;
    y1 = y1|0;
    x2 = x2|0;
    y2 = y2|0;
    x3 = x3|0;
    y3 = y3|0;

    this.polygon([ [ x1, y1 ], [ x2, y2 ], [ x3, y3 ] ]);
  });
};
