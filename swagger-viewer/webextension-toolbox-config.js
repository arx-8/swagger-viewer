/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const { resolve } = require("path")
const GlobEntriesPlugin = require("webpack-watched-glob-entries-plugin")
const babelOptions = require("./babel.config")
/* eslint-enable */

module.exports = {
  /**
   * @param {import('webpack').Configuration} config
   */
  webpack: (config) => {
    // for Debug (JSON.stringifyでは一部の型のtoStringがnullになってしまうため、console.log(confg)も併用した方がよい)
    // console.log(JSON.stringify(config))

    // for TypeScript build
    // eslint-disable-next-line no-param-reassign
    config.resolve.extensions = [
      ...config.resolve.extensions,
      ...[".ts", ".tsx"],
    ]

    // eslint-disable-next-line no-param-reassign
    config.entry = GlobEntriesPlugin.getEntries([
      resolve("app", "*.{js,mjs,jsx,ts,tsx}"),
      resolve("app", "?(scripts)/*.{js,mjs,jsx,ts,tsx}"),
    ])

    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: "babel-loader",
          options: babelOptions,
        },
      ],
    })

    config.module.rules.push({
      test: /\.css/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: { url: false },
        },
      ],
    })

    return config
  },
}
