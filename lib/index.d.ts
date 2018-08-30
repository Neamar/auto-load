declare function autoload(
  baseDirectory: string,
  options?: autoload.AutoloadOptions
): autoload.AutoloadTree;

// Dirty hack so we can import this module using ES6 syntax
// TypeScript won't let you import modules using ES6 syntax using `import * as` if `export =` refers to a function.
// However, using declare namespace autoload {} TypeScript will merge the function declaration and the namespace
// declaration so that this works. This has the added benefit of letting us expose interface types in a CommonJS
// module.
declare namespace autoload {
  export interface AutoloadOptions {
    deep?: boolean
    js?: boolean
    json?: boolean
  }

  export interface AutoloadTree {
    [key: string]: AutoloadTree | any
  }
}

export = autoload;
