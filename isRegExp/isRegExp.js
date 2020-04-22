var _toString = Object.prototype.toString;

function isRegExp (v) {
    return _toString.call(v) === '[object RegExp]'
}

console.log(isRegExp(/^1/));