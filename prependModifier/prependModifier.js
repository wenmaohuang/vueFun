function prependModifier (value, symbol) {
    return typeof value === 'string' ? symbol + value : value
}

console.log(prependModifier('a', 'b'));