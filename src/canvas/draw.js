"use strict";

module.exports = function(gr, _) {
  /**
   * draw
   *
   * @param {function} fn
   * @param {object}   [ctx]
   * @param {...*}
   */
  gr.Canvas.addMethod("draw", function(fn) {
    if (typeof fn === "function") {
      var saved = {};

      assignWithKeys(saved, this.$, this.$.storableKeys);

      var result = fn.apply(this, _.slice(arguments, 1));

      assignWithKeys(this.$, saved, this.$.storableKeys);

      return result === undefined ? this : result;
    }
  });

  function assignWithKeys(dst, src, keys) {
    keys.forEach(function(key) {
      dst[key] = src[key];
    });
  }
};
