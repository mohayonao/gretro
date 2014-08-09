"use strict";

module.exports = function(gr, _) {
  /**
   * stroke
   *
   * @param {int|array|function}
   */
  gr.Canvas.addMethod("stroke", function(color) {
    this.$.strokeColor = _.colorize(color, this.$.tilePalette);
  });
};
