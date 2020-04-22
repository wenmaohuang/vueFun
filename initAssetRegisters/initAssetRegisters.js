var Vue = require('vue')
var vue = new Vue()
var ASSET_TYPES = [
    'component',
    'directive',
    'filter'
];
function initAssetRegisters (Vue) {
    /**
     * Create asset registration js_methods.
     */
    ASSET_TYPES.forEach(function (type) {
        Vue[type] = function (
            id,
            definition
        ) {
            if (!definition) {
                return this.options[type + 's'][id]
            } else {
                /* istanbul ignore if */
                if (type === 'component') {
                    validateComponentName(id);
                }
                if (type === 'component' && isPlainObject(definition)) {
                    definition.name = definition.name || id;
                    definition = this.options._base.extend(definition);
                }
                if (type === 'directive' && typeof definition === 'function') {
                    definition = { bind: definition, update: definition };
                }
                this.options[type + 's'][id] = definition;
                return definition
            }
        };
    });
}

console.log(initAssetRegisters(Vue));