"use strict";

module.exports = function(gr) {
  /**
   *  paste
   *
   *  @param {Canvas} src
   *  @param {int}    [x=0]
   *  @param {int}    [y=0]
   */
  gr.Canvas.addMethod("paste", function(src, x, y) {
    x = x|0;
    y = y|0;

    if (src && this.constructor === src.constructor) {
      var srcData = src.$.data;
      var dstData = this.$.data;
      var mask    = this.$.mask;
      var pixelSize = this.$.pixelSize;
      var clipped   = clip(x, y, src.$.width, src.$.height, this.$.width, this.$.height);

      var fn = null;
      if (mask) {
        fn = function(srcIndex, dstIndex, width) {
          for (var i = 0; i < width; i++) {
            if (mask[dstIndex] !== 0) {
              var srcBuf = srcData.subarray(
                srcIndex * pixelSize, (srcIndex + 1) * pixelSize
              );
              dstData.set(srcBuf, dstIndex * pixelSize);
            }
            srcIndex++;
            dstIndex++;
          }
        };
      } else {
        fn = function(srcIndex, dstIndex, width) {
          var srcBuf = srcData.subarray(
            srcIndex * pixelSize, (srcIndex + width) * pixelSize
          );
          dstData.set(srcBuf, dstIndex * pixelSize);
        };
      }
      perform(src, this, clipped, fn);
    }
  });

  function perform(src, dst, clipped, fn) {
    var srcWidth  = src.$.width;
    var dstWidth  = dst.$.width;
    var width  = clipped.width;
    var height = clipped.height;
    var srcIndex = clipped.srcIndex;
    var dstIndex = (dstWidth * clipped.y) + clipped.x;

    for (var i = 0; i < height; i++) {
      fn(srcIndex, dstIndex, width);
      srcIndex += srcWidth;
      dstIndex += dstWidth;
    }
  }

  function clip(x, y, width, height, dstWidth, dstHeight) {
    var srcIndex = 0;
    var srcWidth = width;

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

    width  = Math.min(width , dstWidth  - x);
    height = Math.min(height, dstHeight - y);

    return { x: x, y: y, width: width, height: height, srcIndex: srcIndex };
  }
};
