var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var ll = 11;
var __ =  0;

describe("#ploygon", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should be able to stroke a polygon", function() {
    var result = canvas.stroke($$).noFill().polygon([
      [ 4, 1 ], [ 1, 4 ], [ 6, 6 ]
    ]);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,__,__,__,$$,__,__,__,
      __,__,__,$$,$$,__,__,__,
      __,__,$$,__,__,$$,__,__,
      __,$$,$$,__,__,$$,__,__,
      __,__,__,$$,$$,__,$$,__,
      __,__,__,__,__,$$,$$,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  describe("should be able to fill a polygon", function() {
    beforeEach(function() {
      canvas.noStroke().fill($$);
    });
    describe("no clipping", function() {
      afterEach(function() {
        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,__,__,__,__,__,__,
          __,__,__,__,$$,__,__,__,
          __,__,__,$$,$$,__,__,__,
          __,__,$$,$$,$$,$$,__,__,
          __,$$,$$,$$,$$,$$,__,__,
          __,__,__,__,$$,$$,$$,__,
          __,__,__,__,__,__,$$,__,
          __,__,__,__,__,__,__,__,
        ]));
      });
      it("a -> b -> c", function() {
        canvas.polygon([
          [ 4, 1 ], [ 1, 4 ], [ 6, 6 ]
        ]);
      });
      it("c -> b -> a", function() {
        canvas.polygon([
          [ 6, 6 ], [ 1, 4 ], [ 4, 1 ]
        ]);
      });
    });

    describe("clipping", function() {
      it("A -> B -> C", function() {
        canvas.polygon([
          [ 4, -2 ], [ -2, 4 ], [ 9, 9 ]
        ]);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,$$,$$,$$,__,__,__,
          __,$$,$$,$$,$$,$$,__,__,
          $$,$$,$$,$$,$$,$$,__,__,
          $$,$$,$$,$$,$$,$$,$$,__,
          $$,$$,$$,$$,$$,$$,$$,__,
          $$,$$,$$,$$,$$,$$,$$,$$,
          __,__,$$,$$,$$,$$,$$,$$,
          __,__,__,__,$$,$$,$$,$$,
        ]));
      });
    });

    describe("other case", function() {
      afterEach(function() {
        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
        ]));
      });

      it("not array", function() {
        canvas.polygon(100);
      });

      it("empty", function() {
        canvas.polygon([
          /* empty */
        ]);
      });

      it("same points", function() {
        canvas.polygon([
          [ 2, 2 ], [ 2, 2 ], [ 2, 2 ]
        ]);
      });
    });
  });

  it("should be able to fill and stroke a polygon", function() {
    var result = canvas.stroke($$).fill(ll).polygon([
      [ 4, 1 ], [ 1, 4 ], [ 6, 6 ]
    ]);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,__,__,__,$$,__,__,__,
      __,__,__,$$,$$,__,__,__,
      __,__,$$,ll,ll,$$,__,__,
      __,$$,$$,ll,ll,$$,__,__,
      __,__,__,$$,$$,ll,$$,__,
      __,__,__,__,__,$$,$$,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});
