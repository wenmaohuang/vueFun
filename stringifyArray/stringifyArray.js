function isDef (v) {
    return v !== undefined && v !== null
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
function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}

function stringifyArray (value) {
    var res = '';
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
            if (res) { res += ' '; }
            res += stringified;
        }
    }
    return res
}

console.log(stringifyArray('a'));