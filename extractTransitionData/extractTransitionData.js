function extractTransitionData (comp) {
    var data = {};
    var options = comp.$options;
    // props
    for (var key in options.propsData) {
        data[key] = comp[key];
    }
    // events.
    // extract listeners and pass them directly to the transition js_methods
    var listeners = options._parentListeners;
    for (var key$1 in listeners) {
        data[camelize(key$1)] = listeners[key$1];
    }
    return data
}

console.log(extractTransitionData('a'));