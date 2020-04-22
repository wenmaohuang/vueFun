function getValue (option) {
    return '_value' in option
        ? option._value
        : option.value
}

console.log(getValue('a'));