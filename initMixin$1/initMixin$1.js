const Vue = require('vue')
function initMixin$1 (Vue) {
    Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin);
        return this
    };
}

console.log(initMixin$1(Vue));