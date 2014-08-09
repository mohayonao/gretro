"use strict";

module.exports = function(gr) {
  /**
   *  getWidth
   */
  gr.Canvas.addMethod("getWidth", function() {
    return this.$.width;
  });
};
