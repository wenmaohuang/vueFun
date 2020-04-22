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