function prependModifierMarker (symbol, name, dynamic) {
    return dynamic
        ? ("_p(" + name + ",\"" + symbol + "\")")
        : symbol + name // mark the event as captured
}

console.log(prependModifierMarker('a', 'b', 'c'));