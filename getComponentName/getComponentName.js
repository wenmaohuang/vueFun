var Vue = require('vue')
var o = Vue.option

function getComponentName (opts) {
    return opts && (opts.Ctor.options.name || opts.tag)
}

console.log(getComponentName(o));