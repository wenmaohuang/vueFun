var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
}
var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

var camelizeRE = /-(\w)/g;

var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
});



function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str))
    })
}
function resolveAsset (
    options,
    type,
    id,
    warnMissing
) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
        return
    }
    var assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id)) { return assets[id] }
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
    // fallback to prototype chain
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (warnMissing && !res) {
        warn(
            'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
            options
        );
    }
    return res
}

var identity = function (_) { return _; };

function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity
}


console.log(resolveFilter({a:1}));