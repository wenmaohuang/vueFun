var _toString = Object.prototype.toString;

function toRawType (value) {
    return _toString.call(value).slice(8, -1)
}

console.log(toRawType(3));