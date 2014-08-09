"use strict";

module.exports = function(gr, _) {
  /**
   * fill
   *
   * @param {int|array|function}
   */
  gr.Canvas.addMethod("fill", function(color) {
    this.$.fillColor = _.colorize(color, this.$.tilePalette);
  });
};
