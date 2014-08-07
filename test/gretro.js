var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("gretro", function() {

  describe("version", function() {
    it("should equal the version specified by package.json", function() {
      var pkg = require("../package.json");

      expect(gretro.version).to.equal(pkg.version);
    });
  });

  describe("Canvas", function() {
    it("should be a function", function() {
      expect(gretro.Canvas).to.be.a("function");
    });
  });

});
