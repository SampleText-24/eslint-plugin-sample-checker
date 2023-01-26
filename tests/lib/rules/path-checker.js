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
    {
      filename: 'C:/Code/react/project/src/entities/Article/',
      code: "import { addNewCommentActions, addNewCommentReducer } from '../../model/slices/addNewCommentSlice';",
      errors: [],
    },
    {
      filename: 'C:/Code/react/project/src/entities/User/',
      code: "import { User, UserSchema } from './model/types/user';",
      errors: [],
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\Article\\model',
      code: "import { articleDetailsReducer } from './slice/articleDetailsSlice';",
      errors: [],
    }
  ],

  invalid: [
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\Article\\',
      code: "import { addNewCommentActions, addNewCommentReducer } from 'entities/Article/model/slices/addNewCommentSlice';",
      errors: [{ message: "В одном слайсе должны быть относительные пути."}],
      output: "import { addNewCommentActions, addNewCommentReducer } from './model/slices/addNewCommentSlice';"
    },
    {
      filename: 'C:/Code/react/project/src/entities/Article/',
      code: "import { addNewCommentActions, addNewCommentReducer } from 'entities/Article/model/slices/addNewCommentSlice';",
      errors: [{ message: "В одном слайсе должны быть относительные пути."}],
      output: "import { addNewCommentActions, addNewCommentReducer } from './model/slices/addNewCommentSlice';"
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\Article\\',
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/entities/Article/model/slices/addNewCommentSlice';",
      errors: [{ message: "В одном слайсе должны быть относительные пути."}],
      output: "import { addNewCommentActions, addNewCommentReducer } from './model/slices/addNewCommentSlice';",
      options: [
        {
          alias: '@'
        },
      ],
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\Article\\model\\',
      code: "import { articleDetailsReducer } from '@/entities/Article/model/slices/articleDetailsSlice';",
      errors: [{ message: "В одном слайсе должны быть относительные пути."}],
      output: "import { articleDetailsReducer } from './slices/articleDetailsSlice';",
      options: [
        {
          alias: '@'
        },
      ],
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\shared\\config\\tests\\componentRender\\componentRender.tsx',
      code: "import i18nForTests from '@/shared/config/i18n/i18nForTests';",
      errors: [{ message: "В одном слайсе должны быть относительные пути."}],
      output: "import i18nForTests from '../../i18n/i18nForTests';",
      options: [
        {
          alias: '@'
        },
      ],
    },
  ],
});
