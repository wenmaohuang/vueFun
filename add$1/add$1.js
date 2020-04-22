var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
var isUsingMicroTask = false;
var target$1;

function add$1 (
    name,
    handler,
    capture,
    passive
) {
    // async edge case #6566: inner click event triggers patch, event handler
    // attached to outer element during patch, and triggered again. This
    // happens because browsers fire microtask ticks between event propagation.
    // the solution is simple: we save the timestamp when a handler is attached,
    // and the handler would only fire if the event passed to it was fired
    // AFTER it was attached.
    if (useMicrotaskFix) {
        var attachedTimestamp = currentFlushTimestamp;
        var original = handler;
        handler = original._wrapper = function (e) {
            if (
                // no bubbling, should always fire.
            // this is just a safety net in case event.timeStamp is unreliable in
            // certain weird environments...
                e.target === e.currentTarget ||
                // event is fired after handler attachment
                e.timeStamp >= attachedTimestamp ||
                // bail for environments that have buggy event.timeStamp implementations
                // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
                // #9681 QtWebEngine event.timeStamp is negative value
                e.timeStamp <= 0 ||
                // #9448 bail if event is fired in another document in a multi-page
                // electron/nw.caseJS app, since event.timeStamp will be using a different
                // starting reference
                e.target.ownerDocument !== document
            ) {
                return original.apply(this, arguments)
            }
        };
    }
    target$1.addEventListener(
        name,
        handler,
        supportsPassive
            ? { capture: capture, passive: passive }
            : capture
    );
}

console.log(add$1('a', 'b', 'c', 'd'));