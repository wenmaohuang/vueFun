function nativeBind (fn, ctx) {
    return fn.bind(ctx)
}

console.log(nativeBind(function () {

}, 'a'));