function isTrue (v) {
    return v === true
}
function isDef (v) {
    return v !== undefined && v !== null
}
var currentRenderingInstance = null;

function resolveAsyncComponent (
    factory,
    baseCtor
) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
        return factory.errorComp
    }

    if (isDef(factory.resolved)) {
        return factory.resolved
    }

    var owner = currentRenderingInstance;
    if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
        // already pending
        factory.owners.push(owner);
    }

    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
        return factory.loadingComp
    }

    if (owner && !isDef(factory.owners)) {
        var owners = factory.owners = [owner];
        var sync = true;
        var timerLoading = null;
        var timerTimeout = null

        ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

        var forceRender = function (renderCompleted) {
            for (var i = 0, l = owners.length; i < l; i++) {
                (owners[i]).$forceUpdate();
            }

            if (renderCompleted) {
                owners.length = 0;
                if (timerLoading !== null) {
                    clearTimeout(timerLoading);
                    timerLoading = null;
                }
                if (timerTimeout !== null) {
                    clearTimeout(timerTimeout);
                    timerTimeout = null;
                }
            }
        };

        var resolve = once(function (res) {
            // cache resolved
            factory.resolved = ensureCtor(res, baseCtor);
            // invoke callbacks only if this is not a synchronous resolve
            // (async resolves are shimmed as synchronous during SSR)
            if (!sync) {
                forceRender(true);
            } else {
                owners.length = 0;
            }
        });

        var reject = once(function (reason) {
            warn(
                "Failed to resolve async js_component: " + (String(factory)) +
                (reason ? ("\nReason: " + reason) : '')
            );
            if (isDef(factory.errorComp)) {
                factory.error = true;
                forceRender(true);
            }
        });

        var res = factory(resolve, reject);

        if (isObject(res)) {
            if (isPromise(res)) {
                // () => Promise
                if (isUndef(factory.resolved)) {
                    res.then(resolve, reject);
                }
            } else if (isPromise(res.component)) {
                res.component.then(resolve, reject);

                if (isDef(res.error)) {
                    factory.errorComp = ensureCtor(res.error, baseCtor);
                }

                if (isDef(res.loading)) {
                    factory.loadingComp = ensureCtor(res.loading, baseCtor);
                    if (res.delay === 0) {
                        factory.loading = true;
                    } else {
                        timerLoading = setTimeout(function () {
                            timerLoading = null;
                            if (isUndef(factory.resolved) && isUndef(factory.error)) {
                                factory.loading = true;
                                forceRender(false);
                            }
                        }, res.delay || 200);
                    }
                }

                if (isDef(res.timeout)) {
                    timerTimeout = setTimeout(function () {
                        timerTimeout = null;
                        if (isUndef(factory.resolved)) {
                            reject(
                                "timeout (" + (res.timeout) + "ms)"
                            );
                        }
                    }, res.timeout);
                }
            }
        }

        sync = false;
        // return in case resolved synchronously
        return factory.loading
            ? factory.loadingComp
            : factory.resolved
    }
}

console.log(resolveAsyncComponent('a', 'b'));