// build と jest で共通化するため、このファイルに外出しして定義している
module.exports = {
  presets: ["@babel/env", "@babel/preset-react", "@babel/preset-typescript"],
  plugins: [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
  ],
}
