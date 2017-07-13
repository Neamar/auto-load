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
  return input.replace(/-(.)/g, function(match, firstLetter) {
    return firstLetter.toUpperCase();
  });
};


// Walk all files and folders in path to build tree
var walk = function(path, options) {
  var tree = {};
  fs.readdirSync(path).forEach(function(file) {
    var name;
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      var extension = systemPath.extname(file);
      if(extension === '.js' && options.js) {
        name = filename(file);
        name = camelCase(name);
        tree[name] = require(newPath);
      }
      else if(extension === '.json' && options.json) {
        name = filename(file);
        name = camelCase(name);
        tree[name] = require(newPath);
      }
    } else if (stat.isDirectory() && options.deep) {
      name = camelCase(file);
      tree[name] = walk(newPath, options);
    }
  });

  return tree;
};


// Main function.
module.exports = function autoload(baseDirectory, options) {
  
  options = options || {};
  if (options.deep === undefined) {
    options.deep = true;
  }
  if (options.js === undefined) {
    options.js = true;
  }
  if (options.json === undefined) {
    options.json = true;
  }
  
  // Check if it's absolute
  // http://stackoverflow.com/q/21698906/938236
  var normalized = systemPath.normalize(baseDirectory).replace(/[\/|\\]$/, '');
  if (systemPath.resolve(baseDirectory) !== normalized) {
    baseDirectory = process.cwd() + '/' + baseDirectory;
  }
  return walk(baseDirectory, options);
};
