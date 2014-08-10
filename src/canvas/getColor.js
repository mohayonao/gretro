"use strict";

module.exports = function(gr, _) {
  /**
   * getColor
   *
   * @param {int} index
   * @return {int} RGB hex code
   */
  gr.Canvas.addMethod("getColor", function(index) {
    index = (index & 15) * 3;
    return _.rgb2num(
      this.$.colorPalette[index    ],
      this.$.colorPalette[index + 1],
      this.$.colorPalette[index + 2]
    );
  });
};
