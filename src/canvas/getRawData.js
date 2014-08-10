"use strict";

module.exports = function(gr) {
  /**
   * getRawData
   *
   * @return {Uint8Array}
   */
  gr.Canvas.addMethod("getRawData", function() {
    return this.$.data;
  });
};
