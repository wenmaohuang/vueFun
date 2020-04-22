function markStaticNode (node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
}

function markStatic (
    tree,
    key,
    isOnce
) {
    if (Array.isArray(tree)) {
        for (var i = 0; i < tree.length; i++) {
            if (tree[i] && typeof tree[i] !== 'string') {
                markStaticNode(tree[i], (key + "_" + i), isOnce);
            }
        }
    } else {
        markStaticNode(tree, key, isOnce);
    }
}

function markOnce (
    tree,
    index,
    key
) {
    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
    return tree
}

console.log(markOnce('a', 'b', 'c'));