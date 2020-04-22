const Vue = require('vue')
var vue = new Vue()
// console.log(Vue);

function stateMixin (Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    var dataDef = {};
    dataDef.get = function () { return this._data };
    var propsDef = {};
    propsDef.get = function () { return this._props };
    {
        dataDef.set = function () {
            warn(
                'Avoid replacing instance root $data. ' +
                'Use nested data properties instead.',
                this
            );
        };
        propsDef.set = function () {
            warn("$props is readonly.", this);
        };
    }
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);

    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

    Vue.prototype.$watch = function (
        expOrFn,
        cb,
        options
    ) {
        var vm = this;
        if (isPlainObject(cb)) {
            return createWatcher(vm, expOrFn, cb, options)
        }
        options = options || {};
        options.user = true;
        var watcher = new Watcher(vm, expOrFn, cb, options);
        if (options.immediate) {
            try {
                cb.call(vm, watcher.value);
            } catch (error) {
                handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
            }
        }
        return function unwatchFn () {
            watcher.teardown();
        }
    };
}

console.log(stateMixin(vue));
// ???