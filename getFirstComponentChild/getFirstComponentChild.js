function getFirstComponentChild (children) {
    if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
            var c = children[i];
            if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                return c
            }
        }
    }
}

console.log(getFirstComponentChild('a'));