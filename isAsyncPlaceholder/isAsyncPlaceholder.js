function isAsyncPlaceholder (node) {
    return node.isComment && node.asyncFactory
}

console.log(isAsyncPlaceholder('a'));