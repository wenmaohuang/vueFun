function remove$2 (
    name,
    handler,
    capture,
    _target
) {
    (_target || target$1).removeEventListener(
        name,
        handler._wrapper || handler,
        capture
    );
}

console.log(remove$2('a', 'b', 'c', 'd'));