"use strict";

module.exports = function(gr) {
  /**
   *  noMask
   */
  gr.Canvas.addMethod("noMask", function() {
    this.$.mask = null;
  });
};
