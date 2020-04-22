var jsdom = require('jsdom')
console.log(new jsdom.VirtualConsole());

function query (el) {
    if (typeof el === 'string') {
        var selected = document.querySelector(el);
        if (!selected) {
            warn(
                'Cannot find element: ' + el
            );
            return document.createElement('div')
        }
        return selected
    } else {
        return el
    }
}

console.log(query('a'));