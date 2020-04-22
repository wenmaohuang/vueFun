function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str))
    })
}
var camelizeRE = /-(\w)/g;

var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});


function mergeProps (to, from) {
    for (var key in from) {
        to[camelize(key)] = from[key];
    }
}

console.log(mergeProps('a', 'b'));