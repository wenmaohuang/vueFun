function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}

function looseEqual (a, b) {
    if (a === b) { return true }
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
        try {
            var isArrayA = Array.isArray(a);
            var isArrayB = Array.isArray(b);
            if (isArrayA && isArrayB) {
                return a.length === b.length && a.every(function (e, i) {
                    return looseEqual(e, b[i])
                })
            } else if (a instanceof Date && b instanceof Date) {
                return a.getTime() === b.getTime()
            } else if (!isArrayA && !isArrayB) {
                var keysA = Object.keys(a);
                var keysB = Object.keys(b);
                return keysA.length === keysB.length && keysA.every(function (key) {
                    return looseEqual(a[key], b[key])
                })
            } else {
                /* istanbul ignore next */
                return false
            }
        } catch (e) {
            /* istanbul ignore next */
            return false
        }
    } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b)
    } else {
        return false
    }
}

function looseIndexOf (arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (looseEqual(arr[i], val)) { return i }
    }
    return -1
}

console.log(looseIndexOf(['a', 'b'], 'a'));