function setAttr (el, key, value) {
    if (el.tagName.indexOf('-') > -1) {
        baseSetAttr(el, key, value);
    } else if (isBooleanAttr(key)) {
        // set attribute for blank value
        // e.g. <option disabled>Select one</option>
        if (isFalsyAttrValue(value)) {
            el.removeAttribute(key);
        } else {
            // technically allowfullscreen is a boolean attribute for <iframe>,
            // but Flash expects a value of "true" when used on <embed> tag
            value = key === 'allowfullscreen' && el.tagName === 'EMBED'
                ? 'true'
                : key;
            el.setAttribute(key, value);
        }
    } else if (isEnumeratedAttr(key)) {
        el.setAttribute(key, convertEnumeratedValue(key, value));
    } else if (isXlink(key)) {
        if (isFalsyAttrValue(value)) {
            el.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else {
            el.setAttributeNS(xlinkNS, key, value);
        }
    } else {
        baseSetAttr(el, key, value);
    }
}

console.log(setAttr('a', 'b', 'c'));