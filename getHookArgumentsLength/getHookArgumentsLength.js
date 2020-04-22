function isUndef (v) {
    return v === undefined || v === null
}
function isDef (v) {
    return v !== undefined && v !== null
}
function getHookArgumentsLength (fn) {
    if (isUndef(fn)) {
        return false
    }
    var invokerFns = fn.fns;
    if (isDef(invokerFns)) {
        // invoker
        return getHookArgumentsLength(
            Array.isArray(invokerFns)
                ? invokerFns[0]
                : invokerFns
        )
    } else {
        return (fn._length || fn.length) > 1
    }
}

console.log(getHookArgumentsLength('a'));