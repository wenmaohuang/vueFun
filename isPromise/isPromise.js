function isDef (v) {
    return v !== undefined && v !== null
}

function isPromise (val) {
    return (
        isDef(val) &&
        typeof val.then === 'function' &&
        typeof val.catch === 'function'
    )
}


console.log(isPromise('a'));