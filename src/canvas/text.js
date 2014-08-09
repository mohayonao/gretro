"use strict";

module.exports = function(gr, _) {
  /**
   * text
   *
   * @param {string}
   * @param {int}
   * @param {int}
   */
  gr.Canvas.addMethod("text", function(text, x, y) {
    text = String(text);

    _.stroke(this, function() {
      for (var i = 0, imax = text.length; i < imax; i++) {
        this.char(text.charCodeAt(i), x + i * 6, y);
      }
    });
  });
};
