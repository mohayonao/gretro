"use strict";

module.exports = function(gr) {
  /**
   * mask
   *
   * @param {Uint8Array} mask
   */
  gr.Canvas.addMethod("mask", function(mask) {
    if (mask instanceof gr.Canvas) {
      mask = mask.$.data;
    }
    this.$.mask = mask;
  });
};
