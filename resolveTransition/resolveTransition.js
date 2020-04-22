function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str))
    })
}

var autoCssTransition = cached(function (name) {
    return {
        enterClass: (name + "-enter"),
        enterToClass: (name + "-enter-to"),
        enterActiveClass: (name + "-enter-active"),
        leaveClass: (name + "-leave"),
        leaveToClass: (name + "-leave-to"),
        leaveActiveClass: (name + "-leave-active")
    }
});

function resolveTransition (def$$1) {
    if (!def$$1) {
        return
    }
    /* istanbul ignore else */
    if (typeof def$$1 === 'object') {
        var res = {};
        if (def$$1.css !== false) {
            extend(res, autoCssTransition(def$$1.name || 'v'));
        }
        extend(res, def$$1);
        return res
    } else if (typeof def$$1 === 'string') {
        return autoCssTransition(def$$1)
    }
}

console.log(resolveTransition('a'));