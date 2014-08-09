"use strict";

/**
 * stroke
 *
 * @param {Canvas}   cnv
 * @param {function} fn
 */
module.exports = function(cnv, fn) {
  if (cnv.$.strokeColor !== -1) {
    fn.call(cnv, cnv.$.strokeColor);
  }
};
