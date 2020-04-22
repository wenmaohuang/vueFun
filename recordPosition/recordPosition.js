function recordPosition (c) {
    c.data.newPos = c.elm.getBoundingClientRect();
}

console.log(recordPosition('a'));