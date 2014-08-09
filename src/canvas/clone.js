"use strict";

module.exports = function(gr) {
  /**
   * clone
   */
  gr.Canvas.addMethod("clone", function() {
    var newInstance = new gr.Canvas(this.$.width, this.$.height, this.$.data);

    newInstance.$.strokeColor  = this.$.strokeColor;
    newInstance.$.fillColor    = this.$.fillColor;
    newInstance.$.colorPalette.set(this.$.colorPalette);
    newInstance.$.tilePalette.set(this.$.tilePalette);

    return newInstance;
  });
};
