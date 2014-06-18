'use strict';

var fs = require('fs');
var systemPath = require('path');


// Patch system path to add a filename function.
// filename("something.js") => "something"
var filename = function(path) {
  var extension = systemPath.extname(path);
  return path.substr(0, path.length - extension.length);
};


// Convert hyphens to camel case
// camelCase("hello-world") => "helloWorld"
var camelCase = function(input) {
  return input.toLowerCase().replace(/-(.)/g, function(match, firstLetter) {
    return firstLetter.toUpperCase();
  });
};


// Walk all files and folders in path to build tree
var walk = function(path) {
  var tree = {};
  fs.readdirSync(path).forEach(function(file) {
    var name;
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      var extension = systemPath.extname(file);
      if(extension === '.js' || extension === '.json') {
        name = filename(file);
        name = camelCase(name);
        tree[name] = require(newPath);
      }
    } else if (stat.isDirectory()) {
      name = camelCase(file);
      tree[name] = walk(newPath);
    }
  });

  return tree;
};


// Main function.
module.exports = function autoload(baseDirectory) {
  return walk(baseDirectory);
};
