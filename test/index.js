"use strict";

require('should');

var autoload = require('../lib/');


describe("Autoload", function() {
  it("should load all subdirectories", function() {
    var tree = autoload(__dirname + "/test-tree");

    tree.should.eql({
      '1': 1,
      '2': 2,
      'Class': "Class",
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

  it("should load all subdirectories based on root", function() {
    var tree = autoload("test/test-tree");

    tree.should.eql({
      '1': 1,
      '2': 2,
      'Class': "Class",
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

  it("should accept the option 'deep' as false", function() {
    var tree = autoload("test/test-tree", {deep: false});

    tree.should.eql({
      '1': 1,
      '2': 2,
      'Class': "Class",
      'withDash': "with-dash"
    });
  });

  it("accepts the option 'deep' as true (same as default)", function() {
    autoload("test/test-tree", {deep: true}).should.eql(autoload("test/test-tree"));
  });

  it("accepts the option 'js' as false", function() {
    var tree = autoload("test/test-tree", {js: false});

    tree.should.eql({
      '3': {
        '32': {
          '321': {
            value: 3
          }
        }
      }
    });
  });

  it("accepts the option 'js' as true (same as default)", function() {
    autoload("test/test-tree", {js: true}).should.eql(autoload("test/test-tree"));
  });

  it("accepts the option 'json' as false", function() {
    var tree = autoload("test/test-tree", {json: false});

    tree.should.eql({
      '1': 1,
      '2': 2,
      'Class': "Class",
      'withDash': "with-dash",
      '3': {
        '31': 31,
        '32': {}
      }
    });
  });

  it("accepts the option 'json' as true (same as default)", function() {
    autoload("test/test-tree", {json: true}).should.eql(autoload("test/test-tree"));
  });
});
