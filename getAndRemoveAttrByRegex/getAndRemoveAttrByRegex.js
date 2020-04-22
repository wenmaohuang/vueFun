function getAndRemoveAttrByRegex (
    el,
    name
) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
        var attr = list[i];
        if (name.test(attr.name)) {
            list.splice(i, 1);
            return attr
        }
    }
}

console.log(getAndRemoveAttrByRegex('a', 'b'));