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
function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set;
} else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = /*@__PURE__*/(function () {
        function Set () {
            this.set = Object.create(null);
        }
        Set.prototype.has = function has (key) {
            return this.set[key] === true
        };
        Set.prototype.add = function add (key) {
            this.set[key] = true;
        };
        Set.prototype.clear = function clear () {
            this.set = Object.create(null);
        };

        return Set;
    }());
}

var seenObjects = new _Set();

function traverse (val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
}

console.log(traverse('a'));