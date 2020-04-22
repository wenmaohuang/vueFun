const Vue = require('vue')
function resolveInject (inject, vm) {
    if (inject) {
        // inject is :any because flow is not smart enough to figure out cached
        var result = Object.create(null);
        var keys = hasSymbol
            ? Reflect.ownKeys(inject)
            : Object.keys(inject);

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            // #6574 in case the inject object is observed...
            if (key === '__ob__') { continue }
            var provideKey = inject[key].from;
            var source = vm;
            while (source) {
                if (source._provided && hasOwn(source._provided, provideKey)) {
                    result[key] = source._provided[provideKey];
                    break
                }
                source = source.$parent;
            }
            if (!source) {
                if ('default' in inject[key]) {
                    var provideDefault = inject[key].default;
                    result[key] = typeof provideDefault === 'function'
                        ? provideDefault.call(vm)
                        : provideDefault;
                } else {
                    warn(("Injection \"" + key + "\" not found"), vm);
                }
            }
        }
        return result
    }
}



function initInjections (vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
        toggleObserving(false);
        Object.keys(result).forEach(function (key) {
            /* istanbul ignore else */
            {
                defineReactive$$1(vm, key, result[key], function () {
                    warn(
                        "Avoid mutating an injected value directly since the changes will be " +
                        "overwritten whenever the provided js_component re-renders. " +
                        "injection being mutated: \"" + key + "\"",
                        vm
                    );
                });
            }
        });
        toggleObserving(true);
    }
}

console.log(initInjections(new Vue()));