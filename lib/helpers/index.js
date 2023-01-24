const path = require('path');

function isPathRelative(path) {
    return path === '.' || path.startsWith('./') || path.startsWith('../');
}

function getCurrentFileLayer(filePath) {
    const normalizedPath = filePath.replace(/\\/g, '/');
    const projectPath = normalizedPath?.split('src')[1];
    const segments = projectPath?.split('/');

    return segments?.[1];
}

function getNormalizedFilePath(filePath) {
    const normalizedPath = path
        .toNamespacedPath(filePath)
        .replace(/\\/g, '/')

    return normalizedPath.split('src')[1]
}

module.exports = {
    isPathRelative,
    getCurrentFileLayer,
    getNormalizedFilePath
}
