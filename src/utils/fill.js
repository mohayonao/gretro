"use strict";

/**
 * fill
 *
 * @param {Canvas}   cnv
 * @param {function} fn
 */
module.exports = function(cnv, fn) {
  if (cnv.$.fillColor !== -1) {
    fn.call(cnv, cnv.$.fillColor);
  }
};
