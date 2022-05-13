// build と jest で共通化するため、このファイルに外出しして定義している
module.exports = {
  // @see https://github.com/facebook/create-react-app/tree/v3.3.0/packages/babel-preset-react-app
  presets: [
    [
      "react-app",
      {
        flow: false,
        typescript: true,
      },
    ],
  ],
}
