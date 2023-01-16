/**
 * @fileoverview descr
 * @author Alexey
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/layer-imports"),
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
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});
ruleTester.run("layer-imports", rule, {
  valid: [
    {
      filename: 'C:\\Code\\react\\project\\src\\features\\Article',
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/shared/button.tsx';",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'C:/Code/react/project/src/features/Article',
      code: "import { addNewCommentActions, addNewCommentReducer } from '@/shared/button.tsx';",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\features\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'C:/Code/react/project/src/features/Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\app\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'C:/Code/react/project/src/app/providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\widgets\\pages',
      code: "import { useLocation } from 'react-router-dom'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'C:/Code/react/project/src/widgets/pages',
      code: "import { useLocation } from 'react-router-dom'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\index.tsx',
      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'C:/Code/react/project/src/index.tsx',
      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\Article.tsx',
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: [
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider']
        }
      ],
    },
    {
      filename: 'C:/Code/react/project/src/entities/Article.tsx',
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: [
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider']
        }
      ],
    },
  ],

  invalid: [
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Article'",
      errors: [{ message: "Слой может импортировать в себя только нижележащие слои"}],
      options: aliasOptions,
    },
    {
      filename: 'C:/Code/react/project/src/entities/providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Article'",
      errors: [{ message: "Слой может импортировать в себя только нижележащие слои"}],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\features\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [{ message: "Слой может импортировать в себя только нижележащие слои"}],
      options: aliasOptions,
    },
    {
      filename: 'C:/Code/react/project/src/features/providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [{ message: "Слой может импортировать в себя только нижележащие слои"}],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Code\\react\\project\\src\\entities\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [{ message: "Слой может импортировать в себя только нижележащие слои"}],
      options: aliasOptions,
    },
    {
      filename: 'C:/Code/react/project/src/entities/providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [{ message: "Слой может импортировать в себя только нижележащие слои"}],
      options: aliasOptions,
    },
  ],
});
