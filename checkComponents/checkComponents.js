function checkComponents (options) {
    for (var key in options.components) {
        validateComponentName(key);
    }
}

console.log(checkComponents('a'));