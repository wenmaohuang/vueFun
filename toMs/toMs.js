function toMs (s) {
    return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

console.log(toMs('a'));