const Vue = require('vue')
const vue = new Vue
function isInInactiveTree (vm) {
    while (vm && (vm = vm.$parent)) {
        if (vm._inactive) { return true }
    }
    return false
}
var targetStack = [];
function pushTarget (target) {
    targetStack.push(target);
    Dep.target = target;
}
function popTarget () {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
}
function callHook (vm, hook) {
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    if (handlers) {
        for (var i = 0, j = handlers.length; i < j; i++) {
            invokeWithErrorHandling(handlers[i], vm, null, vm, info);
        }
    }
    if (vm._hasHookEvent) {
        vm.$emit('hook:' + hook);
    }
    popTarget();
}
var Dep = function Dep () {
    this.id = uid++;
    this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
    this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
    remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
    if (Dep.target) {
        Dep.target.addDep(this);
    }
};

Dep.prototype.notify = function notify () {
    // stabilize the subscriber list first
    var subs = this.subs.slice();
    if (!config.async) {
        // subs aren't sorted in scheduler if not running async
        // we need to sort them now to make sure they fire in correct
        // order
        subs.sort(function (a, b) { return a.id - b.id; });
    }
    for (var i = 0, l = subs.length; i < l; i++) {
        subs[i].update();
    }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
function deactivateChildComponent (vm, direct) {
    if (direct) {
        vm._directInactive = true;
        if (isInInactiveTree(vm)) {
            return
        }
    }
    if (!vm._inactive) {
        vm._inactive = true;
        for (var i = 0; i < vm.$children.length; i++) {
            deactivateChildComponent(vm.$children[i]);
        }
        callHook(vm, 'deactivated');
    }
}

console.log(deactivateChildComponent(vue, 'a'));