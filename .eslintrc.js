// @ts-check

/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "standard",
    "plugin:promise/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
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
      rules: {
        "jest/prefer-strict-equal": 2,
      },
    },
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["sort-destructure-keys", "sort-keys-fix", "typescript-sort-keys"],
  rules: {
    "@typescript-eslint/ban-types": [
      2,
      {
        types: {
          /**
           * `React.FC/VFC` can only be a disadvantage, because generics cannot be defined.
           */
          "React.FC": {
            message: "Use `({...}: Props): JSX.Element => {...}` style instead",
          },
          "React.VFC": {
            message: "Use `({...}: Props): JSX.Element => {...}` style instead",
          },
        },
      },
    ],
    "@typescript-eslint/consistent-type-definitions": [2, "type"],
    "@typescript-eslint/naming-convention": [
      2,
      {
        // "type" naming should be PascalCase
        custom: {
          match: false,
          regex: "send|start|find",
        },
        format: ["PascalCase"],
        selector: "typeAlias",
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          // e.g. Allow `<button onClick={doSomethingAsync} />`
          attributes: false,
        },
      },
    ],
    "@typescript-eslint/no-useless-constructor": 2,
    "@typescript-eslint/prefer-readonly": 2,
    "@typescript-eslint/strict-boolean-expressions": [
      2,
      {
        allowAny: false,
        allowNullableBoolean: false,
        allowNullableNumber: false,
        allowNullableObject: false,
        allowNullableString: false,
        allowNumber: false,
        allowString: false,
      },
    ],
    camelcase: 0,
    "import/no-default-export": 2,
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
          "Do not use `enum`. Use `Plain Object` or `Literal Types` instead.",
        selector: "TSEnumDeclaration",
      },
    ],
    // note you must disable the base rule as it can report incorrect errors
    "no-useless-constructor": 0,
    "prefer-template": 2,
    "react/jsx-boolean-value": 2,
    "react/jsx-sort-props": 2,
    "react/no-array-index-key": 2,
    "react/no-unsafe": [2, { checkAliases: true }],
    "react/prefer-stateless-function": 2,
    "sort-destructure-keys/sort-destructure-keys": 2,
    "sort-keys-fix/sort-keys-fix": 2,
    yoda: [2, "never", { onlyEquality: true }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}

module.exports = config
