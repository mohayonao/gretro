"use strict";

module.exports = function(gr, _) {
  /**
   * fill
   *
   * @param {color} color
   */
  gr.Canvas.addMethod("fill", function(color) {
    this.$.fillColor = _.colorize(color, this.$.tilePalette);
  });
};
