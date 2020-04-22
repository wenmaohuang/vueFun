function isValidArrayIndex (val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val)
}

console.log(isValidArrayIndex('a'))

console.log(isFinite(1));;