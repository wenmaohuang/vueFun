function normalizeInject (options, vm) {
    var inject = options.inject;
    if (!inject) { return }
    var normalized = options.inject = {};
    if (Array.isArray(inject)) {
        for (var i = 0; i < inject.length; i++) {
            normalized[inject[i]] = { from: inject[i] };
        }
    } else if (isPlainObject(inject)) {
        for (var key in inject) {
            var val = inject[key];
            normalized[key] = isPlainObject(val)
                ? extend({ from: key }, val)
                : { from: val };
        }
    } else {
        warn(
            "Invalid value for option \"inject\": expected an Array or an Object, " +
            "but got " + (toRawType(inject)) + ".",
            vm
        );
    }
}

console.log(normalizeInject('a', 'b'));