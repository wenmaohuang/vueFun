function noop (a, b, c) {}


var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
    var hasConsole = typeof console !== 'undefined';
    var classifyRE = /(?:^|[-_])(\w)/g;
    var classify = function (str) { return str
        .replace(classifyRE, function (c) { return c.toUpperCase(); })
        .replace(/[-_]/g, ''); };

    warn = function (msg, vm) {
        var trace = vm ? generateComponentTrace(vm) : '';

        if (config.warnHandler) {
            config.warnHandler.call(null, msg, vm, trace);
        } else if (hasConsole && (!config.silent)) {
            console.error(("[Vue warn]: " + msg + trace));
        }
    };

    tip = function (msg, vm) {
        if (hasConsole && (!config.silent)) {
            console.warn("[Vue tip]: " + msg + (
                vm ? generateComponentTrace(vm) : ''
            ));
        }
    };

    formatComponentName = function (vm, includeFile) {
        if (vm.$root === vm) {
            return '<Root>'
        }
        var options = typeof vm === 'function' && vm.cid != null
            ? vm.options
            : vm._isVue
                ? vm.$options || vm.constructor.options
                : vm;
        var name = options.name || options._componentTag;
        var file = options.__file;
        if (!name && file) {
            var match = file.match(/([^/\\]+)\.vue$/);
            name = match && match[1];
        }

        return (
            (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
            (file && includeFile !== false ? (" at " + file) : '')
        )
    };

    var repeat = function (str, n) {
        var res = '';
        while (n) {
            if (n % 2 === 1) { res += str; }
            if (n > 1) { str += str; }
            n >>= 1;
        }
        return res
    };

    generateComponentTrace = function (vm) {
        if (vm._isVue && vm.$parent) {
            var tree = [];
            var currentRecursiveSequence = 0;
            while (vm) {
                if (tree.length > 0) {
                    var last = tree[tree.length - 1];
                    if (last.constructor === vm.constructor) {
                        currentRecursiveSequence++;
                        vm = vm.$parent;
                        continue
                    } else if (currentRecursiveSequence > 0) {
                        tree[tree.length - 1] = [last, currentRecursiveSequence];
                        currentRecursiveSequence = 0;
                    }
                }
                tree.push(vm);
                vm = vm.$parent;
            }
            return '\n\nfound in\n\n' + tree
                .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
                    ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
                    : formatComponentName(vm))); })
                .join('\n')
        } else {
            return ("\n\n(found in " + (formatComponentName(vm)) + ")")
        }
    };
}
var no = function (a, b, c) { return false; };
function noop (a, b, c) {}
var identity = function (_) { return _; };
var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
];

var config = ({
    /**
     * Option merge strategies (used in core/util/options)
     */
    // $flow-disable-line
    optionMergeStrategies: Object.create(null),

    /**
     * Whether to suppress warnings.
     */
    silent: false,

    /**
     * Show production mode tip message on boot?
     */
    productionTip: "development" !== 'production',

    /**
     * Whether to enable devtools
     */
    devtools: "development" !== 'production',

    /**
     * Whether to record perf
     */
    performance: false,

    /**
     * Error handler for watcher errors
     */
    errorHandler: null,

    /**
     * Warn handler for watcher warns
     */
    warnHandler: null,

    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],

    /**
     * Custom user key aliases for v-on
     */
    // $flow-disable-line
    keyCodes: Object.create(null),

    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * js_component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: no,

    /**
     * Check if an attribute is reserved so that it cannot be used as a js_component
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: no,

    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: no,

    /**
     * Get the namespace of an element
     */
    getTagNamespace: noop,

    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,

    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: no,

    /**
     * Perform updates asynchronously. Intended to be used by Vue Test Utils
     * This will significantly reduce performance if set to false.
     */
    async: true,

    /**
     * Exposed for legacy reasons
     */
    _lifecycleHooks: LIFECYCLE_HOOKS
});
function checkDuration (val, name, vnode) {
    if (typeof val !== 'number') {
        warn(
            "<transition> explicit " + name + " duration is not a valid number - " +
            "got " + (JSON.stringify(val)) + ".",
            vnode.context
        );
    } else if (isNaN(val)) {
        warn(
            "<transition> explicit " + name + " duration is NaN - " +
            'the duration expression might be incorrect.',
            vnode.context
        );
    }
}

console.log(checkDuration('a', 'b', 'c'));