function isSameChild (child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag
}

console.log(isSameChild('a', 'b'));