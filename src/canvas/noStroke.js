"use strict";

module.exports = function(gr) {
  /**
   *  noStroke
   */
  gr.Canvas.addMethod("noStroke", function() {
    this.$.strokeColor = -1;
  });
};
