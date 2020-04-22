function concat (a, b) {
    return a ? b ? (a + ' ' + b) : a : (b || '')
}
function isDef (v) {
    return v !== undefined && v !== null
}
function mergeClassData (child, parent) {
    return {
        staticClass: concat(child.staticClass, parent.staticClass),
        class: isDef(child.class)
            ? [child.class, parent.class]
            : parent.class
    }
}

console.log(mergeClassData('a', 'b'))