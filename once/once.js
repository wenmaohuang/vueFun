function once (fn) {
    var called = false;
    return function () {
        if (!called) {
            called = true;
            fn.apply(this, arguments);
        }
    }
}

console.log(once(function () {
    console.log(1);
}));