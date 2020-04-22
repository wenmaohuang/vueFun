var Vue = require('vue')
var vue = new Vue()
var children = vue.$children

function createKeyToOldIdx (children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key;
        if (isDef(key)) { map[key] = i; }
    }
    return map
}

console.log(createKeyToOldIdx('a', 'b', 'c'));

// ???