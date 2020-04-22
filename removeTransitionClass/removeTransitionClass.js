function removeClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
        return
    }

    /* istanbul ignore else */
    if (el.classList) {
        if (cls.indexOf(' ') > -1) {
            cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
        } else {
            el.classList.remove(cls);
        }
        if (!el.classList.length) {
            el.removeAttribute('class');
        }
    } else {
        var cur = " " + (el.getAttribute('class') || '') + " ";
        var tar = ' ' + cls + ' ';
        while (cur.indexOf(tar) >= 0) {
            cur = cur.replace(tar, ' ');
        }
        cur = cur.trim();
        if (cur) {
            el.setAttribute('class', cur);
        } else {
            el.removeAttribute('class');
        }
    }
}
function removeTransitionClass (el, cls) {
    if (el._transitionClasses) {
        remove(el._transitionClasses, cls);
    }
    removeClass(el, cls);
}

console.log(removeTransitionClass('a', 'b'));