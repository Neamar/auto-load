"use strict";

var autoload = require('../lib/');

describe("Autoload", function() {
  it("should load all subdirectories", function() {
    var tree = autoload(__dirname + "/test-tree");

    tree.should.eql({
      '1': 1,
      '2': 2,
      '3': {
        '31': 31,
        '32': {
          '321': 321
        }
      }
    });
  });
});
