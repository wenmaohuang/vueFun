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