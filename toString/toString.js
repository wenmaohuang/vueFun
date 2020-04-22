var _toString = Object.prototype.toString;

function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
}

function toString (val) {
    return val == null
        ? ''
        : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
            ? JSON.stringify(val, null, 2)
            : String(val)
}

console.log(toString([]));