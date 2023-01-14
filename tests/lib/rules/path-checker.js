/**
 * @fileoverview feature sliced relative path checker
 * @author Alexey
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\Article\\',
      code: "import { addNewCommentActions, addNewCommentReducer } from '../../model/slices/addNewCommentSlice';",
      errors: [],
    },
  ],

  invalid: [
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\Article\\',
      code: "import { addNewCommentActions, addNewCommentReducer } from 'entities/Article/model/slices/addNewCommentSlice';",
      errors: [{ message: "В одном слайсе должны быть относительные пути."}],
    },
    {
      filename: 'C:/Code/react/project/src/entities/Article/',
      code: "import { addNewCommentActions, addNewCommentReducer } from 'entities/Article/model/slices/addNewCommentSlice';",
      errors: [{ message: "В одном слайсе должны быть относительные пути."}],
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\Article\\',
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article/model/slices/addNewCommentSlice';",
      errors: [{ message: "В одном слайсе должны быть относительные пути."}],
      options: [
        {
          alias: '@'
        },
      ],
    },
  ],
});
