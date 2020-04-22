function isDef (v) {
    return v !== undefined && v !== null
}
function isDirtyWithModifiers (elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers; // injected by v-model runtime
    if (isDef(modifiers)) {
        if (modifiers.number) {
            return toNumber(value) !== toNumber(newVal)
        }
        if (modifiers.trim) {
            return value.trim() !== newVal.trim()
        }
    }
    return value !== newVal
}

console.log(isDirtyWithModifiers('a', 'b'));