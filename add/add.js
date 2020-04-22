const Vue= require('vue')

var target = new Vue();

function add (event, fn) {
    target.$on(event, fn);
}

console.log(add('click', function a() {

    }
));