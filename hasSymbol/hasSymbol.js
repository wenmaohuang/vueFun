var hasSymbol =
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}