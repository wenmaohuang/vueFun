
function genStaticKeys (modules) {
    return modules.reduce(function (keys, m) {
        return keys.concat(m.staticKeys || [])
    }, []).join(',')
}

console.log(genStaticKeys('a'));