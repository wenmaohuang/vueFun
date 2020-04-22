function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}
function registerDeepBindings (data) {
    if (isObject(data.style)) {
        traverse(data.style);
    }
    if (isObject(data.class)) {
        traverse(data.class);
    }
}

console.log(registerDeepBindings('a'));