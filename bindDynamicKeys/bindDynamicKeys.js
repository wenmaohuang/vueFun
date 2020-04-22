function bindDynamicKeys (baseObj, values) {
    for (var i = 0; i < values.length; i += 2) {
        var key = values[i];
        if (typeof key === 'string' && key) {
            baseObj[values[i]] = values[i + 1];
        } else if (key !== '' && key !== null) {
            // null is a special value for explicitly removing a binding
            warn(
                ("Invalid value for dynamic directive argument (expected string or null): " + key),
                this
            );
        }
    }
    return baseObj
}

console.log(bindDynamicKeys({}, 'a'));