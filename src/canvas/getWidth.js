"use strict";

module.exports = function(gr) {
  /**
   *  getWidth
   *
   * @return {int} width
   */
  gr.Canvas.addMethod("getWidth", function() {
    return this.$.width;
  });
};
