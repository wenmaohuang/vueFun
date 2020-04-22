function hasNoMatchingOption (value, options) {
    return options.every(function (o) { return !looseEqual(o, value); })
}

console.log(hasNoMatchingOption('a', 'b'));