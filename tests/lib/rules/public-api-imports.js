/**
 * @fileoverview description
 * @author Alexey
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const aliasOptions = [
  {
    alias: '@'
  },
];
const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run("public-api-imports", rule, {
  valid: [
    {
      code: "import { addNewCommentActions, addNewCommentReducer } from '../../model/slices/addNewCommentSlice';",
      errors: [],
    },
    {
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article';",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\file.test.ts\\',
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article/testing';",
      errors: [],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    },
    {
      filename: 'C:/Code/react/project/src/entities/file.test.ts/',
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article/testing';",
      errors: [],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\StoreDecorator.tsx',
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article/testing';",
      errors: [],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    },
  ],

  invalid: [
    {
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article/model/slices/addNewCommentSlice';",
      errors: [{ message: "???????????????????? ???????????? ???????????????? ???????????? ???? Public API (index.ts)"}],
      output: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article';",
      options: aliasOptions,
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\StoreDecorator.tsx',
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article/testing/file.tsx';",
      errors: [{message: '???????????????????? ???????????? ???????????????? ???????????? ???? Public API (index.ts)'}],
      output: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article';",
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    },
    {
      filename: 'C:/Code/react/project/src/entities/StoreDecorator.tsx',
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article/testing/file.tsx';",
      errors: [{message: '???????????????????? ???????????? ???????????????? ???????????? ???? Public API (index.ts)'}],
      output: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article';",
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\forbidden.ts',
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article/testing';",
      errors: [{message: '???????????????? ???????????? ???????????????????? ?????????????????????????? ???? Public API (testing.ts)'}],
      output: null,
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    },
    {
      filename: 'C://Code/react/project/src/entities/forbidden.ts',
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article/testing';",
      errors: [{message: '???????????????? ???????????? ???????????????????? ?????????????????????????? ???? Public API (testing.ts)'}],
      output: null,
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    },
  ],
});
