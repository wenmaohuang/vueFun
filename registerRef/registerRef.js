var VNode = function VNode (
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
};
function registerRef (vnode, isRemoval) {
    var key = vnode.data.ref;
    if (!isDef(key)) { return }

    var vm = vnode.context;
    var ref = vnode.componentInstance || vnode.elm;
    var refs = vm.$refs;
    if (isRemoval) {
        if (Array.isArray(refs[key])) {
            remove(refs[key], ref);
        } else if (refs[key] === ref) {
            refs[key] = undefined;
        }
    } else {
        if (vnode.data.refInFor) {
            if (!Array.isArray(refs[key])) {
                refs[key] = [ref];
            } else if (refs[key].indexOf(ref) < 0) {
                // $flow-disable-line
                refs[key].push(ref);
            }
        } else {
            refs[key] = ref;
        }
    }
}

console.log(registerRef(VNode, 'a'));