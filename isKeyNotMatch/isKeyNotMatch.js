function isKeyNotMatch (expect, actual) {
    if (Array.isArray(expect)) {
        return expect.indexOf(actual) === -1
    } else {
        return expect !== actual
    }
}

console.log(isKeyNotMatch('a', 'b'));