function styleValue (value, type) {
    if (type === 'String') {
        return ("\"" + value + "\"")
    } else if (type === 'Number') {
        return ("" + (Number(value)))
    } else {
        return ("" + value)
    }
}

console.log(styleValue('a', 'b'));