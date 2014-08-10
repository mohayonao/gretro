"use strict";

module.exports = function(gr) {
  /**
   *  unmask
   */
  gr.Canvas.addMethod("unmask", function() {
    this.$.mask = null;
  });
};
