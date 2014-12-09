auto-load
=========
[![Build Status](https://travis-ci.org/Neamar/auto-load.png?branch=master)](https://travis-ci.org/Neamar/auto-load)
[![Dependency Status](https://gemnasium.com/Neamar/auto-load.png)](https://gemnasium.com/Neamar/auto-load)
[![Coverage Status](https://coveralls.io/repos/Neamar/auto-load/badge.png?branch=master)](https://coveralls.io/r/Neamar/auto-load?branch=master)
[![NPM version](https://badge.fury.io/js/auto-load.png)](http://badge.fury.io/js/auto-load)

`require()` all files in subfolder.

This will pre-load all files with require, and build an object.

For instance, given this tree:

```
├── 1.js
├── 2.js
├── 3
│   ├── 31.js
│   └── 32
│       └── 321.js
└── with-dash.js
```

Calling `autoload(__dirname)` will give:

```js
{
  '1': exportsFromFile,
  '2': exportsFromFile,
  'withDash': exportsFromFile,
  '3': {
    '31': exportsFromFile,
    '32': {
      '321': exportsFromFile
    }
  }
}
```

Where `exportsFromFile` is the value returned by the file `module.exports`.

> Non js or json files are not loaded.
