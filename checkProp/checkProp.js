function isDef (v) {
    return v !== undefined && v !== null
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
}
function checkProp (
    res,
    hash,
    key,
    altKey,
    preserve
) {
    if (isDef(hash)) {
        if (hasOwn(hash, key)) {
            res[key] = hash[key];
            if (!preserve) {
                delete hash[key];
            }
            return true
        } else if (hasOwn(hash, altKey)) {
            res[key] = hash[altKey];
            if (!preserve) {
                delete hash[altKey];
            }
            return true
        }
    }
    return false
}

console.log(checkProp('a', 'b', 'c'));