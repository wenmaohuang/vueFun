function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}
function _traverse (val, seen) {
    var i, keys;
    var isA = Array.isArray(val);
    if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
        return
    }
    if (val.__ob__) {
        var depId = val.__ob__.dep.id;
        if (seen.has(depId)) {
            return
        }
        seen.add(depId);
    }
    if (isA) {
        i = val.length;
        while (i--) { _traverse(val[i], seen); }
    } else {
        keys = Object.keys(val);
        i = keys.length;
        while (i--) { _traverse(val[keys[i]], seen); }
    }
}

console.log(_traverse('a', 'b'));