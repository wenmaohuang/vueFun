function mergeAssets (
    parentVal,
    childVal,
    vm,
    key
) {
    var res = Object.create(parentVal || null);
    if (childVal) {
        assertObjectType(key, childVal, vm);
        return extend(res, childVal)
    } else {
        return res
    }
}

console.log(mergeAssets({a:1}, 'b', 'c', 'd'));