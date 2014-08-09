"use strict";

module.exports = function(gr, _) {
  /**
   * toRGBA
   *
   * @param {int} alpha opacity
   */
  gr.Canvas.addMethod("toRGBA", function(alpha) {
    alpha = _.defaults(alpha, 255)|0;

    var result = new Uint8Array(this.$.width * this.$.height * 4);
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
};
