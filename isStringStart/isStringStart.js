function isStringStart (chr) {
    return chr === 0x22 || chr === 0x27
}

console.log(isStringStart('a'));