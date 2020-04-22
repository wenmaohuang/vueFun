function isDef (v) {
    return v !== undefined && v !== null
}
function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}

function stringifyClass (value) {
    if (Array.isArray(value)) {
        return stringifyArray(value)
    }
    if (isObject(value)) {
        return stringifyObject(value)
    }
    if (typeof value === 'string') {
        return value
    }
    /* istanbul ignore next */
    return ''
}
function concat (a, b) {
    return a ? b ? (a + ' ' + b) : a : (b || '')
}
function renderClass (
    staticClass,
    dynamicClass
) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
        return concat(staticClass, stringifyClass(dynamicClass))
    }
    /* istanbul ignore next */
    return ''
}

console.log(renderClass('a', 'b'));