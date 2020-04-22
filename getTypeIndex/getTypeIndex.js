function isSameType (a, b) {
    return getType(a) === getType(b)
}
function getType (fn) {
    var match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : ''
}
function getTypeIndex (type, expectedTypes) {
    if (!Array.isArray(expectedTypes)) {
        return isSameType(expectedTypes, type) ? 0 : -1
    }
    for (var i = 0, len = expectedTypes.length; i < len; i++) {
        if (isSameType(expectedTypes[i], type)) {
            return i
        }
    }
    return -1
}

console.log(getTypeIndex('a', 'b'));