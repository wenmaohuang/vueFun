function createElementNS (namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName)
}