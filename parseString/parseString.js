var len, str, chr, index$1, expressionPos, expressionEndPos;

function eof () {
    return index$1 >= len
}
function next () {
    return str.charCodeAt(++index$1)
}
function parseString (chr) {
    var stringQuote = chr;
    while (!eof()) {
        chr = next();
        if (chr === stringQuote) {
            break
        }
    }
}

console.log(parseString('a'));