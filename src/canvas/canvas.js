"use strict";

var dollar = require("./dollar");

module.exports = function(gr, _) {
  /**
   * Canvas
   *
   * @param  {int} [width=640]
   * @param  {int} [height=400]
   * @param  {Uint8Array} [buffer]
   * @return {Canvas}
   */
  function Canvas(width, height, buffer) {
    width  = _.defaults(width , 640)|0;
    height = _.defaults(height, 400)|0;

    var $ = dollar(width, height, buffer);

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
