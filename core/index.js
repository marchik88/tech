let modules = Object.create(null);
let plugins = Object.create(null);

/**
 * Create tool for add modules/plugins
 * to global import
 */
const add = Object.create(null);

add.to = {
    set modules(module) {
        if (!module.config.name) throw new Error('Module must contain key name!');
        if (modules[module.config.name]) throw new Error(`Plugin ${pluginConfig.config.name} already set!`);

        modules[module.config.name] = module;
    },
    set plugins(plugin) {
        if (!plugin.config.name) throw new Error('Plugin must contain key name!');
        if (plugins[plugin.config.name]) throw new Error(`Plugin ${plugin.config.name} already set!`);

        plugins[plugin.config.name] = plugin;
    }
};

/**
 * Create tool for global import
 * modules/plugins from any place
 */
const _import = Object.create(null);

_import.module = modules;
_import.plugin = plugins;

/**
 * Export core tools
 */
export default Object.freeze({
    add, import: _import
});