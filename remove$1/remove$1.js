const Vue= require('vue')

var target = new Vue();

function remove$1 (event, fn) {
    target.$off(event, fn);
}

console.log(remove$1('click', function () {

    }
));