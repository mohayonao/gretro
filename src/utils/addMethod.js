"use strict";

/**
 * addMethod
 *
 * @param {object}   ctx
 * @param {string}   name
 * @param {function} method
 */
module.exports = function(ctx, name, method) {
  ctx[name] = function() {
    var result = method.apply(this, arguments);

    return result === undefined ? this : result;
  };

  return this;
};
