function _enter (_, vnode) {
    if (vnode.data.show !== true) {
        enter(vnode);
    }
}

console.log(_enter('a', 'b'));