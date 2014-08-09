"use strict";

var dollar = require("./dollar");

module.exports = function(gr, _) {
  /**
   * Canvas
   *
   * @param {int}
   * @param {int}
   * @param {Uint8Array}
   */
  function Canvas(width, height, src) {
    width  = _.defaults(width , 640)|0;
    height = _.defaults(height, 400)|0;

    var $ = dollar(width, height, src);

    $.putPixel = function(x, y, color) {
      var colorIndex = color.valueOf(x, y);
      if (colorIndex !== -1) {
        $.data[y * width + x] = colorIndex & 15;
      }
    };

    this.$ = $;
  }

  gr.Canvas = Canvas;

  gr.Canvas.addMethod = function(name, method) {
    _.addMethod(Canvas.prototype, name, method);
  };
};
