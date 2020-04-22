function baseWarn (msg, range) {
    console.error(("[Vue compiler]: " + msg));
}
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
function transformNode (el, options) {
    var warn = options.warn || baseWarn;
    var staticClass = getAndRemoveAttr(el, 'class');
    if (staticClass) {
        var res = parseText(staticClass, options.delimiters);
        if (res) {
            warn(
                "class=\"" + staticClass + "\": " +
                'Interpolation inside attributes has been removed. ' +
                'Use v-bind or the colon shorthand instead. For example, ' +
                'instead of <div class="{{ val }}">, use <div :class="val">.',
                el.rawAttrsMap['class']
            );
        }
    }
    if (staticClass) {
        el.staticClass = JSON.stringify(staticClass);
    }
    var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
    if (classBinding) {
        el.classBinding = classBinding;
    }
}

console.log(transformNode('a', 'b'));