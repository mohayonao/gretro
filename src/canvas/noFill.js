"use strict";

module.exports = function(gr) {
  /**
   *  noFill
   */
  gr.Canvas.addMethod("noFill", function() {
    this.$.fillColor = -1;
  });
};
