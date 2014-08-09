"use strict";

module.exports = function(gr, _) {
  /**
   * toRGBA
   *
   * @param {int} [alpha=255] opacity
   * @return {Uint8Array}
   */
  gr.Canvas.addMethod("toRGBA", function(alpha) {
    alpha = _.defaults(alpha, 255)|0;

    var length = this.$.width * this.$.height;
    var result = new Uint8Array(length * 4);
    var data   = this.$.data;
    var width  = this.$.width;
    var height = this.$.height;
    var colorPalette = this.$.colorPalette;

    var i = 0, j = 0;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var paletteIndex = data[i++] * 3;
        result[j++] = colorPalette[paletteIndex    ];
        result[j++] = colorPalette[paletteIndex + 1];
        result[j++] = colorPalette[paletteIndex + 2];
        result[j++] = alpha;
      }
    }

    return result;
  });

  gr.CanvasRGB.addMethod("toRGBA", function(alpha) {
    alpha = _.defaults(alpha, 255)|0;

    var length = this.$.width * this.$.height;
    var result = new Uint8Array(length * 4);
    var data   = this.$.data;

    for (var i = 0, j = 0, k = 0; i < length; i++) {
      result[j++] = data[k++];
      result[j++] = data[k++];
      result[j++] = data[k++];
      result[j++] = alpha;
    }

    return result;
  });

  gr.CanvasRGBA.addMethod("toRGBA", function() {
    return new Uint8Array(this.$.data);
  });
};
