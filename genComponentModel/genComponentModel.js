function genAssignmentCode (
    value,
    assignment
) {
    var res = parseModel(value);
    if (res.key === null) {
        return (value + "=" + assignment)
    } else {
        return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
    }
}
function parseModel (val) {
    // Fix https://github.com/vuejs/vue/pull/7730
    // allow v-model="obj.val " (trailing whitespace)
    val = val.trim();
    len = val.length;

    if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
        index$1 = val.lastIndexOf('.');
        if (index$1 > -1) {
            return {
                exp: val.slice(0, index$1),
                key: '"' + val.slice(index$1 + 1) + '"'
            }
        } else {
            return {
                exp: val,
                key: null
            }
        }
    }

    str = val;
    index$1 = expressionPos = expressionEndPos = 0;

    while (!eof()) {
        chr = next();
        /* istanbul ignore if */
        if (isStringStart(chr)) {
            parseString(chr);
        } else if (chr === 0x5B) {
            parseBracket(chr);
        }
    }

    return {
        exp: val.slice(0, expressionPos),
        key: val.slice(expressionPos + 1, expressionEndPos)
    }
}
function genComponentModel (
    el,
    value,
    modifiers
) {
    var ref = modifiers || {};
    var number = ref.number;
    var trim = ref.trim;

    var baseValueExpression = '$$v';
    var valueExpression = baseValueExpression;
    if (trim) {
        valueExpression =
            "(typeof " + baseValueExpression + " === 'string'" +
            "? " + baseValueExpression + ".trim()" +
            ": " + baseValueExpression + ")";
    }
    if (number) {
        valueExpression = "_n(" + valueExpression + ")";
    }
    var assignment = genAssignmentCode(value, valueExpression);

    el.model = {
        value: ("(" + value + ")"),
        expression: JSON.stringify(value),
        callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
    };
}

console.log(genComponentModel('a', 'b', 'c'));