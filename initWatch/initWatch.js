const Vue  = require('vue')
var vue = new Vue()
function createWatcher (
    vm,
    expOrFn,
    handler,
    options
) {
    if (isPlainObject(handler)) {
        options = handler;
        handler = handler.handler;
    }
    if (typeof handler === 'string') {
        handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options)
}
var _toString = Object.prototype.toString;

function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
}
function initWatch (vm, watch) {
    for (var key in watch) {
        var handler = watch[key];
        if (Array.isArray(handler)) {
            for (var i = 0; i < handler.length; i++) {
                createWatcher(vm, key, handler[i]);
            }
        } else {
            createWatcher(vm, key, handler);
        }
    }
}

console.log(initWatch(vue, {a: 1}));