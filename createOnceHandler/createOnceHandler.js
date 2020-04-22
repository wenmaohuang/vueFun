var target
function createOnceHandler (event, fn) {
    var _target = target;
    return function onceHandler () {
        var res = fn.apply(null, arguments);
        if (res !== null) {
            _target.$off(event, onceHandler);
        }
    }
}


console.log(createOnceHandler('click', function () {

    }
));