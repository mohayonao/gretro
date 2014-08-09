"use strict";

/**
 * stroke
 */
module.exports = function(that, fn) {
  if (that.$.strokeColor !== -1) {
    fn.call(that, that.$.strokeColor);
  }
};
