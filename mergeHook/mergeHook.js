function dedupeHooks (hooks) {
    var res = [];
    for (var i = 0; i < hooks.length; i++) {
        if (res.indexOf(hooks[i]) === -1) {
            res.push(hooks[i]);
        }
    }
    return res
}

function mergeHook (
    parentVal,
    childVal
) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
}

console.log(mergeHook('a', 'b'));