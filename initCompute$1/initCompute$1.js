var Vue = require('vue')

function initComputed$1 (Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
        defineComputed(Comp.prototype, key, computed[key]);
    }
}

console.log(initComputed$1(Vue));