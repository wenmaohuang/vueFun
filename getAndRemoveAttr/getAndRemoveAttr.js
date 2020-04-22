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