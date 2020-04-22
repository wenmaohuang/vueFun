function actuallySetSelected (el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
        warn(
            "<select multiple v-model=\"" + (binding.expression) + "\"> " +
            "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
            vm
        );
        return
    }
    var selected, option;
    for (var i = 0, l = el.options.length; i < l; i++) {
        option = el.options[i];
        if (isMultiple) {
            selected = looseIndexOf(value, getValue(option)) > -1;
            if (option.selected !== selected) {
                option.selected = selected;
            }
        } else {
            if (looseEqual(getValue(option), value)) {
                if (el.selectedIndex !== i) {
                    el.selectedIndex = i;
                }
                return
            }
        }
    }
    if (!isMultiple) {
        el.selectedIndex = -1;
    }
}
function setSelected (el, binding, vm) {
    actuallySetSelected(el, binding, vm);
    /* istanbul ignore if */
    if (isIE || isEdge) {
        setTimeout(function () {
            actuallySetSelected(el, binding, vm);
        }, 0);
    }
}

console.log(setSelected('a', 'b', 'c'));