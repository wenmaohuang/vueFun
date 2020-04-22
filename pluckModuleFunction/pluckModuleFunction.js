function pluckModuleFunction (
    modules,
    key
) {
    return modules
        ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
        : []
}

console.log(pluckModuleFunction('a', 'b'));