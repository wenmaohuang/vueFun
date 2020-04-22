function normalizeScopedSlot(normalSlots, key, fn) {
    var normalized = function () {
        var res = arguments.length ? fn.apply(null, arguments) : fn({});
        res = res && typeof res === 'object' && !Array.isArray(res)
            ? [res] // single vnode
            : normalizeChildren(res);
        return res && (
            res.length === 0 ||
            (res.length === 1 && res[0].isComment) // #9658
        ) ? undefined
            : res
    };
    // this is a slot using the new v-slot syntax without scope. although it is
    // compiled as a scoped slot, render fn users would expect it to be present
    // on this.$slots because the usage is semantically a normal slot.
    if (fn.proxy) {
        Object.defineProperty(normalSlots, key, {
            get: normalized,
            enumerable: true,
            configurable: true
        });
    }
    return normalized
}