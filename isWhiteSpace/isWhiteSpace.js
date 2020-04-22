function isWhitespace (node) {
    return (node.isComment && !node.asyncFactory) || node.text === ' '
}

