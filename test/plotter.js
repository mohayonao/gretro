var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#plotter", function() {
  var canvas  = null;
  var plotter = null;

  beforeEach(function() {
    canvas  = new gretro.Canvas(8, 8);
    plotter = canvas.plotter(1, 2, $$);
  });

  describe("#moveTo", function() {
    it("should move a cursor", function() {
      plotter.moveTo(10, 15);

      expect(plotter.getX()).to.equal(10);
      expect(plotter.getY()).to.equal(15);
    });
  });

  describe("#lineTo", function() {
    it("should draw a line", function() {
      plotter.lineTo(6, 2);

      expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,$$,$$,$$,$$,$$,$$,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
      ]));

      expect(plotter.getX()).to.equal(6);
      expect(plotter.getY()).to.equal(2);
    });
  });

  describe("#moveToRel", function() {
    it("should move a cursor", function() {
      plotter.moveToRel(9, 13);

      expect(plotter.getX()).to.equal(10);
      expect(plotter.getY()).to.equal(15);
    });
  });

  describe("#lineToRel", function() {
    it("should draw a line", function() {;
      plotter.lineToRel(5, 0);

      expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,$$,$$,$$,$$,$$,$$,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
        __,__,__,__,__,__,__,__,
      ]));

      expect(plotter.getX()).to.equal(6);
      expect(plotter.getY()).to.equal(2);
    });
  });

});
