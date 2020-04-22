var _toString = Object.prototype.toString;

function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
}

console.log(isPlainObject('a'));