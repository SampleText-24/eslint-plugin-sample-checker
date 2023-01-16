const {isPathRelative} = require('../helpers');
const path = require('path');
const micromatch = require('micromatch');

module.exports = {
  meta: {
    type: null,
    docs: {
      description: "description",
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
          testFilesPatterns: {
            type: 'array',
          }
        }
      }
    ],
  },

  create(context) {
    const {alias = '', testFilesPatterns = []} = context.options[0] ?? {};

    const checkingLayers = {
      'entities': 'entities',
      'features': 'features',
      'pages': 'pages',
      'widgets': 'widgets',
    }

    return {
      ImportDeclaration(node) {
        // example app/entities/Article
        const value = node.source.value;
        const importTo = alias ? value.replace(`${alias}/`, '') : value;

        if (isPathRelative(importTo)) {
          return;
        }

        const segments = importTo.split('/');
        const isImportNotFromPublicApi = segments.length > 2;
        const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4

        const layer = segments[0]
        if (!checkingLayers[layer]) {
          return;
        }

        if (isImportNotFromPublicApi && !isTestingPublicApi) {
          context.report(node, 'Абсолютный импорт разрешен только из Public API (index.ts)');
        }

        if (isTestingPublicApi) {
          const currentFilePath = context.getFilename();
          const normalizedPath = path
              .toNamespacedPath(currentFilePath)
              .replace(/\\/g, '/');
          const isCurrentFileTesting = testFilesPatterns.some(pattern => micromatch.isMatch(normalizedPath, pattern))

          if (!isCurrentFileTesting) {
            context.report(node, 'Тестовые данные необходимо импортировать из Public API (testing.ts)');
          }
        }

      }
    };
  },
};
