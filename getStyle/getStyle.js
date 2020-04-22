function normalizeStyleBinding (bindingStyle) {
    if (Array.isArray(bindingStyle)) {
        return toObject(bindingStyle)
    }
    if (typeof bindingStyle === 'string') {
        return parseStyleText(bindingStyle)
    }
    return bindingStyle
}
function normalizeStyleData (data) {
    var style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle
        ? extend(data.staticStyle, style)
        : style
}
function getStyle (vnode, checkChild) {
    var res = {};
    var styleData;

    if (checkChild) {
        var childNode = vnode;
        while (childNode.componentInstance) {
            childNode = childNode.componentInstance._vnode;
            if (
                childNode && childNode.data &&
                (styleData = normalizeStyleData(childNode.data))
            ) {
                extend(res, styleData);
            }
        }
    }

    if ((styleData = normalizeStyleData(vnode.data))) {
        extend(res, styleData);
    }

    var parentNode = vnode;
    while ((parentNode = parentNode.parent)) {
        if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
            extend(res, styleData);
        }
    }
    return res
}

console.log(getStyle('a', 'b'));