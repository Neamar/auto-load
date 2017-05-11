

declare module 'auto-load' {
    declare type ModuleExports = any;
    declare type AutoloadTree = {
        [key: string]: AutoloadTree | ModuleExports
    };

    declare interface AutoloadOptions {
        deep?: boolean,
        js?: boolean,
        json?: boolean
    }

    declare function autoload(baseDirectory: string, options?: AutoloadOptions): AutoloadTree;

    export = autoload;
}
