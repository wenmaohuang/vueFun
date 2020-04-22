const Vue = require('vue')
const vue = new Vue()
function isInInactiveTree (vm) {
    while (vm && (vm = vm.$parent)) {
        if (vm._inactive) { return true }
    }
    return false
}

console.log(isInInactiveTree(vue));