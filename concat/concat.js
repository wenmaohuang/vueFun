function concat (a, b) {
    return a ? b ? (a + ' ' + b) : a : (b || '')
}