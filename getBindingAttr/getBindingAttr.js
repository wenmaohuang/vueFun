function getAndRemoveAttr (
    el,
    name,
    removeFromMap
) {
    var val;
    if ((val = el.attrsMap[name]) != null) {
        var list = el.attrsList;
        for (var i = 0, l = list.length; i < l; i++) {
            if (list[i].name === name) {
                list.splice(i, 1);
                break
            }
        }
    }
    if (removeFromMap) {
        delete el.attrsMap[name];
    }
    return val
}
function getBindingAttr (
    el,
    name,
    getStatic
) {
    var dynamicValue =
        getAndRemoveAttr(el, ':' + name) ||
        getAndRemoveAttr(el, 'v-bind:' + name);
    if (dynamicValue != null) {
        return parseFilters(dynamicValue)
    } else if (getStatic !== false) {
        var staticValue = getAndRemoveAttr(el, name);
        if (staticValue != null) {
            return JSON.stringify(staticValue)
        }
    }
}

console.log(getBindingAttr('a', 'b', 'c'));