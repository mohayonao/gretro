"use strict";

module.exports = function(gr, _) {
  /**
   *  paste
   *
   *  @param {Canvas} src
   *  @param {int}    x
   *  @param {int}    y
   *  @param {int}    [mask=-1]
   */
  gr.Canvas.addMethod("paste", function(src, x, y, mask) {
    x = x|0;
    y = y|0;
    mask = _.defaults(mask, -1)|0;

    if (src && this.constructor === src.constructor) {
      var srcData = src.$.data;
      var dstData = this.$.data;
      var clipped = clip(x, y, src.$.width, src.$.height);

      var fn = null;
      if (src instanceof gr.CanvasRGB) {
        fn = function(srcIndex, dstIndex, width) {
          dstData.set(srcData.subarray(srcIndex, srcIndex + width), dstIndex);
        };
      } else {
        fn = function(srcIndex, dstIndex, width) {
          for (var j = 0; j < width; j++) {
            if (srcData[srcIndex + j] !== mask) {
              dstData[dstIndex + j] = srcData[srcIndex + j];
            }
          }
        };
      }
      perform(src, this, clipped, fn);
    }
  });

  function perform(src, dst, clipped, fn) {
    var srcWidth  = src.$.width;
    var dstWidth  = dst.$.width;
    var pixelSize = dst.$.pixelSize;
    var width  = clipped.width * pixelSize;
    var height = clipped.height;
    var srcIndex = clipped.srcIndex * pixelSize;
    var dstIndex = (dstWidth * clipped.y) + clipped.x;
    var srcIndexIncr = srcWidth * pixelSize;
    var dstIndexIncr = dstWidth * pixelSize;

    for (var i = 0; i < height; i++) {
      fn(srcIndex, dstIndex, width);
      srcIndex += srcIndexIncr;
      dstIndex += dstIndexIncr;
    }
  }

  function clip(x, y, width, height) {
    var srcIndex  = 0;
    var srcWidth  = width;
    var srcHeight = height;

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

    return { x: x, y: y, width: width, height: height, srcIndex: srcIndex };
  }
};
