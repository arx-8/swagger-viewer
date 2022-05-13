// @ts-check

/**
 * @type {import("@jest/types").Config.InitialOptions}
 */
const config = {
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["dist", "packages"],
}

module.exports = config
