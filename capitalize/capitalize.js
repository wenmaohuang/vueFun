function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str))
    })
}

var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
});

console.log(capitalize('a'));