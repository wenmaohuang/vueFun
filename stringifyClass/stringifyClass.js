function stringifyClass (value) {
    if (Array.isArray(value)) {
        return stringifyArray(value)
    }
    if (isObject(value)) {
        return stringifyObject(value)
    }
    if (typeof value === 'string') {
        return value
    }
    /* istanbul ignore next */
    return ''
}