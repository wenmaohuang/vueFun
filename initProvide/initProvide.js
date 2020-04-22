const Vue = require('vue')

function initProvide (vm) {
    var provide = vm.$options.provide;
    if (provide) {
        vm._provided = typeof provide === 'function'
            ? provide.call(vm)
            : provide;
    }
}

console.log(initProvide(new Vue()));