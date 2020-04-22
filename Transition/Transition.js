var Transition = {
    name: 'transition',
    props: transitionProps,
    abstract: true,

    render: function render (h) {
        var this$1 = this;

        var children = this.$slots.default;
        if (!children) {
            return
        }

        // filter out text nodes (possible whitespaces)
        children = children.filter(isNotTextNode);
        /* istanbul ignore if */
        if (!children.length) {
            return
        }

        // warn multiple elements
        if (children.length > 1) {
            warn(
                '<transition> can only be used on a single element. Use ' +
                '<transition-group> for lists.',
                this.$parent
            );
        }

        var mode = this.mode;

        // warn invalid mode
        if (mode && mode !== 'in-out' && mode !== 'out-in'
        ) {
            warn(
                'invalid <transition> mode: ' + mode,
                this.$parent
            );
        }

        var rawChild = children[0];

        // if this is a js_component root caseNode and the js_component's
        // parent container caseNode also has transition, skip.
        if (hasParentTransition(this.$vnode)) {
            return rawChild
        }

        // apply transition data to child
        // use getRealChild() to ignore abstract components e.g. keep-alive
        var child = getRealChild(rawChild);
        /* istanbul ignore if */
        if (!child) {
            return rawChild
        }

        if (this._leaving) {
            return placeholder(h, rawChild)
        }

        // ensure a key that is unique to the vnode type and to this transition
        // js_component instance. This key will be used to remove pending leaving nodes
        // during entering.
        var id = "__transition-" + (this._uid) + "-";
        child.key = child.key == null
            ? child.isComment
                ? id + 'comment'
                : id + child.tag
            : isPrimitive(child.key)
                ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
                : child.key;

        var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
        var oldRawChild = this._vnode;
        var oldChild = getRealChild(oldRawChild);

        // mark v-show
        // so that the transition module can hand over the control to the directive
        if (child.data.directives && child.data.directives.some(isVShowDirective)) {
            child.data.show = true;
        }

        if (
            oldChild &&
            oldChild.data &&
            !isSameChild(child, oldChild) &&
            !isAsyncPlaceholder(oldChild) &&
            // #6687 js_component root is a comment caseNode
            !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
        ) {
            // replace old child transition data with fresh one
            // important for dynamic transitions!
            var oldData = oldChild.data.transition = extend({}, data);
            // handle transition mode
            if (mode === 'out-in') {
                // return placeholder caseNode and queue update when leave finishes
                this._leaving = true;
                mergeVNodeHook(oldData, 'afterLeave', function () {
                    this$1._leaving = false;
                    this$1.$forceUpdate();
                });
                return placeholder(h, rawChild)
            } else if (mode === 'in-out') {
                if (isAsyncPlaceholder(child)) {
                    return oldRawChild
                }
                var delayedLeave;
                var performLeave = function () { delayedLeave(); };
                mergeVNodeHook(data, 'afterEnter', performLeave);
                mergeVNodeHook(data, 'enterCancelled', performLeave);
                mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
            }
        }

        return rawChild
    }
};