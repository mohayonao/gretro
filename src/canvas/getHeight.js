"use strict";

module.exports = function(gr) {
  /**
   * getHeight
   */
  gr.Canvas.addMethod("getHeight", function() {
    return this.$.height;
  });
};
