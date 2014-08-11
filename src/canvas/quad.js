"use strict";

module.exports = function(gr) {
  /**
   * quad
   *
   * @param {int} x1
   * @param {int} y1
   * @param {int} x2
   * @param {int} y2
   * @param {int} x3
   * @param {int} y3
   * @param {int} x4
   * @param {int} y4
   */
  gr.Canvas.addMethod("quad", function(x1, y1, x2, y2, x3, y3, x4, y4) {
    x1 = x1|0;
    y1 = y1|0;
    x2 = x2|0;
    y2 = y2|0;
    x3 = x3|0;
    y3 = y3|0;
    x4 = x4|0;
    y4 = y4|0;

    this.polygon([ [ x1, y1 ], [ x2, y2 ], [ x3, y3 ], [ x4, y4 ] ]);
  });
};
