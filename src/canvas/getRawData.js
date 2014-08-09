"use strict";

module.exports = function(gr) {
  /**
   * getRawData
   */
  gr.Canvas.addMethod("getRawData", function() {
    return this.$.data;
  });
};
