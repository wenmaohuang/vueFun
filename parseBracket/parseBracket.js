var len, str, chr, index$1, expressionPos, expressionEndPos;
function eof () {
    return index$1 >= len
}
function next () {
    return str.charCodeAt(++index$1)
}
function parseBracket (chr) {
    var inBracket = 1;
    expressionPos = index$1;
    while (!eof()) {
        chr = next();
        if (isStringStart(chr)) {
            parseString(chr);
            continue
        }
        if (chr === 0x5B) { inBracket++; }
        if (chr === 0x5D) { inBracket--; }
        if (inBracket === 0) {
            expressionEndPos = index$1;
            break
        }
    }
}

console.log(parseBracket('a'));