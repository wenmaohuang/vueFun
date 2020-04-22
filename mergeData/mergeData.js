var hasSymbol =
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
}

function isUndef (v) {
    return v === undefined || v === null
}

function isPrimitive (value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        // $flow-disable-line
        typeof value === 'symbol' ||
        typeof value === 'boolean'
    )
}

function set (target, key, val) {
    if (isUndef(target) || isPrimitive(target)
    ) {
        warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        return val
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        return val
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
        warn(
            'Avoid adding reactive properties to a Vue instance or its root $data ' +
            'at runtime - declare it upfront in the data option.'
        );
        return val
    }
    if (!ob) {
        target[key] = val;
        return val
    }
    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val
}

function mergeData (to, from) {
    if (!from) { return to }
    var key, toVal, fromVal;

    var keys = hasSymbol
        ? Reflect.ownKeys(from)
        : Object.keys(from);

    for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        // in case the object is already observed...
        if (key === '__ob__') { continue }
        toVal = to[key];
        fromVal = from[key];
        if (!hasOwn(to, key)) {
            set(to, key, fromVal);
        } else if (
            toVal !== fromVal &&
            isPlainObject(toVal) &&
            isPlainObject(fromVal)
        ) {
            mergeData(toVal, fromVal);
        }
    }
    return to
}

console.log(mergeData({a:1}, {b:2}));