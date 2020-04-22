var key = ''
var propOptions = {}
var prop = propOptions[key];

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