function proxyNormalSlot(slots, key) {
    return function () { return slots[key]; }
}

console.log(proxyNormalSlot('a', 'b'));