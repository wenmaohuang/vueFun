// const Vue = require('vue')

function renderSlot (
    name,
    fallback,
    props,
    bindObject
) {
    var scopedSlotFn = this.$scopedSlots[name];
    var nodes;
    if (scopedSlotFn) { // scoped slot
        props = props || {};
        if (bindObject) {
            if (!isObject(bindObject)) {
                warn(
                    'slot v-bind without argument expects an Object',
                    this
                );
            }
            props = extend(extend({}, bindObject), props);
        }
        nodes = scopedSlotFn(props) || fallback;
    } else {
        nodes = this.$slots[name] || fallback;
    }

    var target = props && props.slot;
    if (target) {
        return this.$createElement('template', { slot: target }, nodes)
    } else {
        return nodes
    }
}

console.log(renderSlot('a', 'b', 'c', 'd'));


// ???