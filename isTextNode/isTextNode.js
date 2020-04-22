function isDef (v) {
    return v !== undefined && v !== null
}

function isTextNode (node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

console.log(isTextNode('a'));