"use strict";

module.exports = function(gr) {
  /**
   * toRGB
   *
   * @return {Uint8Array}
   */
  gr.Canvas.addMethod("toRGB", function() {
    var length = this.$.width * this.$.height;
    var result = new Uint8Array(length * 3);
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
      }
    }

    return result;
  });

  gr.CanvasRGB.addMethod("toRGB", function() {
    return new Uint8Array(this.$.data);
  });

  gr.CanvasRGBA.addMethod("toRGB", function() {
    var length = this.$.width * this.$.height;
    var result = new Uint8Array(length * 3);
    var data   = this.$.data;

    for (var i = 0, j = 0, k = 0; i < length; i++, k++) {
      result[j++] = data[k++];
      result[j++] = data[k++];
      result[j++] = data[k++];
    }

    return result;
  });
};
