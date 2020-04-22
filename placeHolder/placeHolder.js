function placeholder (h, rawChild) {
    if (/\d-keep-alive$/.test(rawChild.tag)) {
        return h('keep-alive', {
            props: rawChild.componentOptions.propsData
        })
    }
}

console.log(placeholder('a', 'b'));