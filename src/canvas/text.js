"use strict";

module.exports = function(gr, _) {
  /**
   * text
   *
   * @param {string} str
   * @param {int}    x
   * @param {int}    y
   */
  gr.Canvas.addMethod("text", function(str, x, y) {
    str = String(str);
    x   = x|0;
    y   = y|0;

    _.stroke(this, function() {
      for (var i = 0, imax = str.length; i < imax; i++) {
        this.char(str.charCodeAt(i), x + i * 6, y);
      }
    });
  });
};
