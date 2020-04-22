function extend (to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to
}

console.log(extend(1, 3));