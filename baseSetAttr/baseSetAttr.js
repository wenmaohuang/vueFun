function baseSetAttr (el, key, value) {
    if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
    } else {
        // #7138: IE10 & 11 fires input event when setting placeholder on
        // <textarea>... block the first input event and remove the blocker
        // immediately.
        /* istanbul ignore if */
        if (
            isIE && !isIE9 &&
            el.tagName === 'TEXTAREA' &&
            key === 'placeholder' && value !== '' && !el.__ieph
        ) {
            var blocker = function (e) {
                e.stopImmediatePropagation();
                el.removeEventListener('input', blocker);
            };
            el.addEventListener('input', blocker);
            // $flow-disable-line
            el.__ieph = true; /* IE placeholder patched */
        }
        el.setAttribute(key, value);
    }
}

