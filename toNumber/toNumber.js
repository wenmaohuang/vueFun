function toNumber (val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n
}

console.log(toNumber('a'));