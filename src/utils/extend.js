"use strict";

/**
 * extend
 *
 * @param {function} child
 * @param {function} parent
 * @return {function} child
 */
module.exports = function(child, parent) {
  Object.keys(parent).forEach(function(key) {
    child[key] = parent[key];
  });

  function Ctor() {
    this.constructor = child;
  }

  Ctor.prototype = parent.prototype;
  child.prototype = new Ctor();

  return child;
};
