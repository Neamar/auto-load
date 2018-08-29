declare module 'auto-load' {
    type ModuleExports = any;
    type AutoloadTree = {
        [key: string]: AutoloadTree | ModuleExports
    };

    interface AutoloadOptions {
        deep?: boolean,
        js?: boolean,
        json?: boolean
    }

    function autoload(baseDirectory: string, options?: AutoloadOptions): AutoloadTree;

    export = autoload;
}
