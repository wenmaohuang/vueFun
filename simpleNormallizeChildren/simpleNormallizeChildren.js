function simpleNormalizeChildren (children) {
    for (var i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
            return Array.prototype.concat.apply([], children)
        }
    }
    return children
}

console.log(simpleNormalizeChildren('a'));