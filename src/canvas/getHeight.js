"use strict";

module.exports = function(gr) {
  /**
   * getHeight
   *
   * @return {int} height
   */
  gr.Canvas.addMethod("getHeight", function() {
    return this.$.height;
  });
};
