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
function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}

function normalizeScopedSlots (
    slots,
    normalSlots,
    prevSlots
) {
    var res;
    var hasNormalSlots = Object.keys(normalSlots).length > 0;
    var isStable = slots ? !!slots.$stable : !hasNormalSlots;
    var key = slots && slots.$key;
    if (!slots) {
        res = {};
    } else if (slots._normalized) {
        // fast path 1: child js_component re-render only, parent did not change
        return slots._normalized
    } else if (
        isStable &&
        prevSlots &&
        prevSlots !== emptyObject &&
        key === prevSlots.$key &&
        !hasNormalSlots &&
        !prevSlots.$hasNormal
    ) {
        // fast path 2: stable scoped slots w/ no normal slots to proxy,
        // only need to normalize once
        return prevSlots
    } else {
        res = {};
        for (var key$1 in slots) {
            if (slots[key$1] && key$1[0] !== '$') {
                res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
            }
        }
    }
    // expose normal slots on scopedSlots
    for (var key$2 in normalSlots) {
        if (!(key$2 in res)) {
            res[key$2] = proxyNormalSlot(normalSlots, key$2);
        }
    }
    // avoriaz seems to mock a non-extensible $scopedSlots object
    // and when that is passed down this would cause an error
    if (slots && Object.isExtensible(slots)) {
        (slots)._normalized = res;
    }
    def(res, '$stable', isStable);
    def(res, '$key', key);
    def(res, '$hasNormal', hasNormalSlots);
    return res
}


console.log(normalizeScopedSlots('a', 'b', 'c'));