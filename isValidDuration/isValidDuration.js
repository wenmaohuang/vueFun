function isValidDuration (val) {
    return typeof val === 'number' && !isNaN(val)
}

console.log(isValidDuration('a'));