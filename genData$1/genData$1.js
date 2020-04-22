function genData$1 (el) {
    var data = '';
    if (el.staticStyle) {
        data += "staticStyle:" + (el.staticStyle) + ",";
    }
    if (el.styleBinding) {
        data += "style:(" + (el.styleBinding) + "),";
    }
    return data
}

console.log(genData$1('a'));