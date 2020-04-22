function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
        try {
            fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
        } catch (e) {
            handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
        }
    }
}

console.log(callHook$1('a', 'b', 'c', 'd', 'e'));