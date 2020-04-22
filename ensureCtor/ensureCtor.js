var hasSymbol =
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}
function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}
function ensureCtor (comp, base) {
    if (
        comp.__esModule ||
        (hasSymbol && comp[Symbol.toStringTag] === 'Module')
    ) {
        comp = comp.default;
    }
    return isObject(comp)
        ? base.extend(comp)
        : comp
}

console.log(ensureCtor('a', 'b'));