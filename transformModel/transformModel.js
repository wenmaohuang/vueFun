function transformModel (options, data) {
    var prop = (options.model && options.model.prop) || 'value';
    var event = (options.model && options.model.event) || 'input'
    ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
    var on = data.on || (data.on = {});
    var existing = on[event];
    var callback = data.model.callback;
    if (isDef(existing)) {
        if (
            Array.isArray(existing)
                ? existing.indexOf(callback) === -1
                : existing !== callback
        ) {
            on[event] = [callback].concat(existing);
        }
    } else {
        on[event] = callback;
    }
}

console.log(transformModel('a', 'b'));
// ???