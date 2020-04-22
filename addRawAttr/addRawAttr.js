function addRawAttr (el, name, value, range) {
    el.attrsMap[name] = value;
    el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

console.log(addRawAttr('a', 'b', 'c', 'd'));