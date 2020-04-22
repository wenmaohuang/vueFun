const Vue = require('vue')
var vue = new Vue()
var com = vue.$options._base
// console.log(com);

function initProps$1 (Comp) {
    var props = Comp.options.props;
    for (var key in props) {
        proxy(Comp.prototype, "_props", key);
    }
}

console.log(initProps$1(com));