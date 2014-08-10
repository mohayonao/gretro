"use strict";

module.exports = function(gr, _) {
  /**
   * clear
   */
  gr.Canvas.addMethod("clear", function() {
    _.fill(this, function(color) {
      var width  = this.$.width;
      var height = this.$.height;

      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          this.$.putPixel(x, y, color);
        }
      }
    });
  });
};
