const { resolve } = require("path")
const GlobEntriesPlugin = require("webpack-watched-glob-entries-plugin")

module.exports = {
  webpack: (config) => {
    // for TypeScript build
    config.resolve.extensions = [
      ...config.resolve.extensions,
      ...[".ts", ".tsx"],
    ]

    config.entry = GlobEntriesPlugin.getEntries([
      resolve("app", "*.{js,mjs,jsx,ts,tsx}"),
      resolve("app", "?(scripts)/*.{js,mjs,jsx,ts,tsx}"),
    ])

    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
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
