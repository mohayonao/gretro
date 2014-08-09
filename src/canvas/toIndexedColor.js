"use strict";

module.exports = function(gr) {
  /**
   * toIndexedColor
   */
  gr.Canvas.addMethod("toIndexedColor", function() {
    return new Uint8Array(this.$.data);
  });
};
