function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str))
    })
}

console.log(cached('a'));