"use strict";

module.exports = function(gr) {
  /**
   *  noClip
   */
  gr.Canvas.addMethod("noClip", function() {
    this.$.minX = 0;
    this.$.minY = 0;
    this.$.maxX = this.$.width  - 1;
    this.$.maxY = this.$.height - 1;
  });
};
