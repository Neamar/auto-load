"use strict";

require('should');

var autoload = require('../lib/');


describe("Autoload", function() {
  it("should load all subdirectories", function() {
    var tree = autoload(__dirname + "/test-tree");

    tree.should.eql({
      '1': 1,
      '2': 2,
      'withDash': "with-dash",
      '3': {
        '31': 31,
        '32': {
          '321': {
            value: 3
          }
        }
      }
    });
  });

  it("should load all subdirectories based on root", function(){
    var tree = autoload("test/test-tree");

    tree.should.eql({
      '1': 1,
      '2': 2,
      'withDash': "with-dash",
      '3': {
        '31': 31,
        '32': {
          '321': {
            value: 3
          }
        }
      }
    });
  });
});
