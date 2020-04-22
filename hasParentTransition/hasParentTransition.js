function hasParentTransition (vnode) {
    while ((vnode = vnode.parent)) {
        if (vnode.data.transition) {
            return true
        }
    }
}

console.log(hasParentTransition('a'));