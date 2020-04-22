function assertProp (
    prop,
    name,
    value,
    vm,
    absent
) {
    if (prop.required && absent) {
        warn(
            'Missing required prop: "' + name + '"',
            vm
        );
        return
    }
    if (value == null && !prop.required) {
        return
    }
    var type = prop.type;
    var valid = !type || type === true;
    var expectedTypes = [];
    if (type) {
        if (!Array.isArray(type)) {
            type = [type];
        }
        for (var i = 0; i < type.length && !valid; i++) {
            var assertedType = assertType(value, type[i]);
            expectedTypes.push(assertedType.expectedType || '');
            valid = assertedType.valid;
        }
    }

    if (!valid) {
        warn(
            getInvalidTypeMessage(name, value, expectedTypes),
            vm
        );
        return
    }
    var validator = prop.validator;
    if (validator) {
        if (!validator(value)) {
            warn(
                'Invalid prop: custom validator check failed for prop "' + name + '".',
                vm
            );
        }
    }
}