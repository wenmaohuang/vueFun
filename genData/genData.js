function genData (el) {
    var data = '';
    if (el.staticClass) {
        data += "staticClass:" + (el.staticClass) + ",";
    }
    if (el.classBinding) {
        data += "class:" + (el.classBinding) + ",";
    }
    return data
}

console.log(genData('a'));