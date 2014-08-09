"use strict";

module.exports = function(gr, _) {
  /**
   * stroke
   *
   * @param {color} color
   */
  gr.Canvas.addMethod("stroke", function(color) {
    this.$.strokeColor = _.colorize(color, this.$.tilePalette);
  });
};
