function _createElement (
    context,
    tag,
    data,
    children,
    normalizationType
) {
    if (isDef(data) && isDef((data).__ob__)) {
        warn(
            "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
            'Always create fresh vnode data objects in each render!',
            context
        );
        return createEmptyVNode()
    }
    // object syntax in v-bind
    if (isDef(data) && isDef(data.is)) {
        tag = data.is;
    }
    if (!tag) {
        // in case of js_component :is set to falsy value
        return createEmptyVNode()
    }
    // warn against non-primitive key
    if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
    ) {
        {
            warn(
                'Avoid using non-primitive value as key, ' +
                'use string/number value instead.',
                context
            );
        }
    }
    // support single function children as default scoped slot
    if (Array.isArray(children) &&
        typeof children[0] === 'function'
    ) {
        data = data || {};
        data.scopedSlots = { default: children[0] };
        children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
        children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
        children = simpleNormalizeChildren(children);
    }
    var vnode, ns;
    if (typeof tag === 'string') {
        var Ctor;
        ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
        if (config.isReservedTag(tag)) {
            // platform built-in elements
            if (isDef(data) && isDef(data.nativeOn)) {
                warn(
                    ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
                    context
                );
            }
            vnode = new VNode(
                config.parsePlatformTagName(tag), data, children,
                undefined, undefined, context
            );
        } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
            // js_component
            vnode = createComponent(Ctor, data, context, children, tag);
        } else {
            // unknown or unlisted namespaced elements
            // check at runtime because it may get assigned a namespace when its
            // parent normalizes children
            vnode = new VNode(
                tag, data, children,
                undefined, undefined, context
            );
        }
    } else {
        // direct js_component options / constructor
        vnode = createComponent(tag, data, context, children);
    }
    if (Array.isArray(vnode)) {
        return vnode
    } else if (isDef(vnode)) {
        if (isDef(ns)) { applyNS(vnode, ns); }
        if (isDef(data)) { registerDeepBindings(data); }
        return vnode
    } else {
        return createEmptyVNode()
    }
}