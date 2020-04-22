function isUndef (v) {
    return v === undefined || v === null
}

function createComponent (
    Ctor,
    data,
    context,
    children,
    tag
) {
    if (isUndef(Ctor)) {
        return
    }

    var baseCtor = context.$options._base;

    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
        Ctor = baseCtor.extend(Ctor);
    }

    // if at this stage it's not a constructor or an async js_component factory,
    // reject.
    if (typeof Ctor !== 'function') {
        {
            warn(("Invalid Component definition: " + (String(Ctor))), context);
        }
        return
    }

    // async js_component
    var asyncFactory;
    if (isUndef(Ctor.cid)) {
        asyncFactory = Ctor;
        Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
        if (Ctor === undefined) {
            // return a placeholder caseNode for async js_component, which is rendered
            // as a comment caseNode but preserves all the raw information for the caseNode.
            // the information will be used for async server-rendering and hydration.
            return createAsyncPlaceholder(
                asyncFactory,
                data,
                context,
                children,
                tag
            )
        }
    }

    data = data || {};

    // resolve constructor options in case global mixins are applied after
    // js_component constructor creation
    resolveConstructorOptions(Ctor);

    // transform js_component v-model data into props & events
    if (isDef(data.model)) {
        transformModel(Ctor.options, data);
    }

    // extract props
    var propsData = extractPropsFromVNodeData(data, Ctor, tag);

    // functional js_component
    if (isTrue(Ctor.options.functional)) {
        return createFunctionalComponent(Ctor, propsData, data, context, children)
    }

    // extract listeners, since these needs to be treated as
    // child js_component listeners instead of DOM listeners
    var listeners = data.on;
    // replace with listeners with .native modifier
    // so it gets processed during parent js_component patch.
    data.on = data.nativeOn;

    if (isTrue(Ctor.options.abstract)) {
        // abstract components do not keep anything
        // other than props & listeners & slot

        // work around flow
        var slot = data.slot;
        data = {};
        if (slot) {
            data.slot = slot;
        }
    }

    // install js_component management hooks onto the placeholder caseNode
    installComponentHooks(data);

    // return a placeholder vnode
    var name = Ctor.options.name || tag;
    var vnode = new VNode(
        ("case_VUE-js_component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
        data, undefined, undefined, undefined, context,
        { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
        asyncFactory
    );

    return vnode
}

console.log(createComponent('a', 'b', 'c', 'd', 'e'));

// ???