"use strict";

module.exports = function(gr) {
  /**
   *  paste
   *
   *  @param {Canvas}
   *  @param {int}    x
   *  @param {int}    y
   *  @param {int}    mask
   */
  gr.Canvas.addMethod("paste", function(canvas, x, y, mask) {
    if (canvas instanceof gr.Canvas) {
      paste(this.$, canvas, x|0, y|0, mask);
    }
  });

  function paste($, canvas, x, y, mask) {
    var srcData = canvas.getRawData();
    var dstData = $.data;
    var srcWidth  = canvas.getWidth();
    var srcHeight = canvas.getHeight();
    var dstWidth  = $.width;
    var width  = srcWidth;
    var height = srcHeight;
    var srcIndex = 0;
    var dstIndex = 0;

    if (x < 0) {
      width += x;
      srcIndex -= x;
      x = 0;
    }
    if (y < 0) {
      height += y;
      srcIndex -= y * srcWidth;
      y = 0;
    }

    width  = Math.min(srcWidth , width  - x);
    height = Math.min(srcHeight, height - y);
    dstIndex = (dstWidth * y) + x;

    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        if (srcData[srcIndex + j] !== mask) {
          dstData[dstIndex + j] = srcData[srcIndex + j];
        }
      }
      srcIndex += srcWidth;
      dstIndex += dstWidth;
    }
  }
};
