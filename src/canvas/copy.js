"use strict";

module.exports = function(gr) {
  /**
   * copy
   *
   * @param {int} x1
   * @param {int} y1
   * @param {int} x2
   * @param {int} y2
   * @return {Canvas}
   */
  gr.Canvas.addMethod("copy", function(x1, y1, x2, y2) {
    x1 = x1|0;
    y1 = y1|0;
    x2 = x2|0;
    y2 = y2|0;

    var params = copy(this.$, x1, y1, x2, y2);
    var newInstance = new gr.Canvas(params[0], params[1], params[2]);

    newInstance.$.colorPalette.set(this.$.colorPalette);
    newInstance.$.tilePalette.set(this.$.tilePalette);

    return newInstance;
  });

  function perform($, scanY, scanX, width, height) {
    var dstData = new Uint8Array(width * height);

    for (var i = 0; i < height; i++) {
      dstData.set(scanX(scanY(i)), i * width);
    }

    return [ width, height, dstData ];
  }

  function copy($, x1, y1, x2, y2) {
    x1 = Math.max(0, Math.min(x1, $.width - 1));
    x2 = Math.max(0, Math.min(x2, $.width - 1));
    y1 = Math.max(0, Math.min(y1, $.height - 1));
    y2 = Math.max(0, Math.min(y2, $.height - 1));

    var width  = Math.abs(x2 - x1) + 1;
    var height = Math.abs(y2 - y1) + 1;
    var scanY  = (y1 <= y2) ?
      scanFromTop(x1, y1, $.width) : scanFromBottom(x1, y1, $.width);
    var scanX  = (x1 <= x2) ?
      scanToRight($.data, width, $.pixelSize) : scanToLeft($.data, width, $.pixelSize);

    return perform($, scanY, scanX, width, height);
  }

  function scanFromTop(x, y, width) {
    return function(i) {
      return (y + i) * width + x;
    };
  }

  function scanFromBottom(x, y, width) {
    return function(i) {
      return (y - i) * width + x;
    };
  }

  function scanToRight(data, width, pixelSize) {
    return function(index) {
      return data.subarray(index * pixelSize, (index + width) * pixelSize);
    };
  }

  function scanToLeft(data, width, pixelSize) {
    return function(index) {
      var result = new Uint8Array(width * pixelSize);

      for (var i = 0; i < width; i++) {
        for (var j = 0; j < pixelSize; j++) {
          result[i * pixelSize + j] = data[(index - i) * pixelSize + j];
        }
      }

      return result;
    };
  }
};
