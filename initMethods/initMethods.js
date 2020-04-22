const Vue = require('vue')
var vue = new Vue()
function initMethods (vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
        {
            if (typeof methods[key] !== 'function') {
                warn(
                    "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the js_component definition. " +
                    "Did you reference the function correctly?",
                    vm
                );
            }
            if (props && hasOwn(props, key)) {
                warn(
                    ("Method \"" + key + "\" has already been defined as a prop."),
                    vm
                );
            }
            if ((key in vm) && isReserved(key)) {
                warn(
                    "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
                    "Avoid defining js_component js_methods that start with _ or $."
                );
            }
        }
        vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
    }
}

console.log(initMethods(vue, function () {
        console.log(1);
    }
));

