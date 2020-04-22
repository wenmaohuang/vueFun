function createGetterInvoker(fn) {
    return function computedGetter () {
        return fn.call(this, this)
    }
}

console.log(createGetterInvoker(function () {

    }
));
