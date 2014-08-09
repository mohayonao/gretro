"use strict";

/**
 * fill
 */
module.exports = function(that, fn) {
  if (that.$.fillColor !== -1) {
    fn.call(that, that.$.fillColor);
  }
};
