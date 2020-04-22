var Vue = require('vue')
var vue = new Vue()
console.log(vue);

function getRawBindingAttr (
    el,
    name
) {
    return el.rawAttrsMap[':' + name] ||
        el.rawAttrsMap['v-bind:' + name] ||
        el.rawAttrsMap[name]
}

console.log(getRawBindingAttr('a', 'b'));