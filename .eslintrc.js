// @ts-check

/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  env: {
    browser: true,
    es6: true,
    webextensions: true,
  },
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "react-app",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:typescript-sort-keys/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": [
          2,
          {
            allowExpressions: true,
          },
        ],
        "@typescript-eslint/explicit-module-boundary-types": 2,
      },
    },
    {
      extends: ["plugin:jest/recommended"],
      files: ["*.test.ts", "*.test.tsx"],
    },
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "sort-destructure-keys",
    "sort-keys-fix",
    "typescript-sort-keys",
  ],
  rules: {
    "@typescript-eslint/camelcase": 0,

    // React Component のボイラープレートコードを減らすため
    "@typescript-eslint/consistent-type-definitions": [2, "type"],

    "@typescript-eslint/explicit-member-accessibility": 0,

    // Other
    "@typescript-eslint/no-explicit-any": 2,

    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: false,
      },
    ],

    // constructor のショートハンド（メンバーの省略記法）を使いたいため
    "@typescript-eslint/no-parameter-properties": 0,

    // バグの温床になりやすいコードを防ぐため
    "@typescript-eslint/no-unused-expressions": [
      2,
      {
        allowShortCircuit: false,
        allowTaggedTemplates: false,
        allowTernary: false,
      },
    ],

    "@typescript-eslint/no-use-before-define": 0,

    "@typescript-eslint/prefer-readonly": 2,

    "@typescript-eslint/require-await": 2,

    camelcase: 0,

    "import/no-default-export": 2,

    // ts と eslint の相性不良周りを解消するための設定
    "import/no-unresolved": 0,

    "no-alert": 2,

    // for-of-awaitを使用するため
    "no-await-in-loop": 0,

    "no-empty-function": 0,

    "no-restricted-globals": [
      2,
      {
        message: "Use getDocument().",
        name: "document",
      },
      {
        message: "Use standard object.",
        name: "Map",
      },
    ],

    "no-restricted-properties": [
      2,
      {
        message:
          "Use 'textContent' instead. Because 'innerText' is (almost) not recommended.",
        property: "innerText",
      },
    ],

    "no-restricted-syntax": [
      2,
      {
        message:
          "Do not declare enums. Use `Plain Object` or `Literal Types` instead.",
        selector: "TSEnumDeclaration",
      },
    ],

    // ホイスティングの許可
    "no-use-before-define": 0,

    "no-useless-constructor": 0,

    "react/jsx-boolean-value": 2,

    "react/jsx-filename-extension": [2, { extensions: [".tsx"] }],

    // jsx pragma 次第で Short Syntax が使えないため
    "react/jsx-fragments": [2, "element"],

    "react/jsx-sort-props": 2,

    "react/no-access-state-in-setstate": 2,

    "react/no-array-index-key": 2,

    "react/no-did-mount-set-state": 2,

    "react/no-unsafe": [2, { checkAliases: true }],

    "react/prefer-stateless-function": 2,

    "react/prop-types": 0,

    "react/void-dom-elements-no-children": 2,

    // note you must disable the base rule as it can report incorrect errors
    "require-await": 0,

    "sort-destructure-keys/sort-destructure-keys": 2,

    "sort-keys-fix/sort-keys-fix": 2,
  },
}

module.exports = config
