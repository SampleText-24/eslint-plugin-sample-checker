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
  ],

  invalid: [
    {
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article/model/slices/addNewCommentSlice';",
      errors: [{ message: "Абсолютный импорт разрешен только из Public API (index.ts)"}],
      options: aliasOptions,
    },
  ],
});
