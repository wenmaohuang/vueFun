function resolveModifiedOptions (Ctor) {
    var modified;
    var latest = Ctor.options;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
        if (latest[key] !== sealed[key]) {
            if (!modified) { modified = {}; }
            modified[key] = latest[key];
        }
    }
    return modified
}

console.log(resolveModifiedOptions('a'));