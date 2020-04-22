var target$1;

function createOnceHandler$1 (event, handler, capture) {
    var _target = target$1; // save current target element in closure
    return function onceHandler () {
        var res = handler.apply(null, arguments);
        if (res !== null) {
            remove$2(event, onceHandler, capture, _target);
        }
    }
}


console.log(createOnceHandler$1('a', 'b', 'c'));