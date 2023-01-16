const {getCurrentFileLayer, isPathRelative} = require("../helpers");
const micromatch = require("micromatch");

module.exports = {
  meta: {
    type: null,
    docs: {
      description: "descr",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
          ignoreImportPatterns: {
            type: 'array',
          }
        }
      }
    ],
  },

  create(context) {
    const layers = {
      'app': ['shared', 'entities', 'features', 'widgets', 'pages'],
      'pages': ['shared', 'entities', 'features', 'widgets'],
      'widgets': ['shared', 'entities', 'features'],
      'features': ['shared', 'entities'],
      'entities': ['shared', 'entities'],
      'shared': ['shared'],
    };

    const availableLayers = {
      'app': 'app',
      'entities': 'entities',
      'features': 'features',
      'shared': 'shared',
      'pages': 'pages',
      'widgets': 'widgets',
    };

    const {alias = '', ignoreImportPatterns = []} = context.options[0] ?? {};
    const currentFilePath = context.getFilename();

    const getImportLayer = (value) => {
      const importPath = alias ? value.replace(`${alias}/`, '') : value
      const segments = importPath?.split('/')

      return segments?.[0]
    }

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        const currentFileLayer = getCurrentFileLayer(currentFilePath);
        const importLayer = getImportLayer(importPath)

        if (isPathRelative(importPath)) {
          return;
        }

        if (!availableLayers[importLayer] || !availableLayers[currentFileLayer]) {
          return;
        }

        const isIgnored = ignoreImportPatterns.some(pattern => {
          return micromatch.isMatch(importPath, pattern)
        })

        if (isIgnored) {
          return;
        }

        if (!layers[currentFileLayer]?.includes(importLayer)) {
          context.report(node, 'Слой может импортировать в себя только нижележащие слои')
        }

      }
    };
  },
};
