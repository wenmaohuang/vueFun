function mergeHook$1 (f1, f2) {
    var merged = function (a, b) {
        // flow complains about extra args which is why we use any
        f1(a, b);
        f2(a, b);
    };
    merged._merged = true;
    return merged
}


console.log(mergeHook$1('a', 'b'));