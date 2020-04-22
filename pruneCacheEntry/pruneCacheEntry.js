function remove (arr, item) {
    if (arr.length) {
        var index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}


function pruneCacheEntry (
    cache,
    key,
    keys,
    current
) {
    var cached$$1 = cache[key];
    if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
        cached$$1.componentInstance.$destroy();
    }
    cache[key] = null;
    remove(keys, key);
}


console.log(pruneCacheEntry('a', 'b', 'c', 'd'));