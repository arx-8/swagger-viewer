module.exports = {
  env: {
    browser: true,
    es6: true,
    webextensions: true,
  },
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
    /** @see https://github.com/prettier/eslint-config-prettier#installation */
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "jest", "react"],
  rules: {
    "arrow-body-style": "off",
    "import/first": "off",
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",
    "no-console": "off",
    "no-restricted-globals": [
      "error",
      {
        name: "document",
        message: "Use getDocument().",
      },
      {
        name: "Map",
        message: "Use standard object.",
      },
    ],
    "no-restricted-properties": [
      "error",
      {
        property: "innerText",
        message:
          "Use 'textContent' instead. Because 'innerText' is (almost) not recommended.",
      },
    ],
    "no-underscore-dangle": [
      "error",
      {
        allowAfterSuper: true,
        allowAfterThis: true,
      },
    ],
    "prefer-arrow-callback": [
      "error",
      {
        allowNamedFunctions: false,
        allowUnboundThis: false,
      },
    ],
    "prettier/prettier": [
      "error",
      {
        arrowParens: "always",
        semi: false,
        trailingComma: "all",
      },
    ],

    // constructor のショートハンド（メンバーの省略記法）を使いたいため
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "no-useless-constructor": "off",
    "no-empty-function": "off",

    // ホイスティングの許可
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",

    // React Component の書き心地がとても悪くなるため
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/prefer-interface": "off",

    // ts と eslint の相性不良周りを解消するための設定
    "import/no-unresolved": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],

    // しょうがない
    "@typescript-eslint/no-explicit-any": "off",
  },
}
