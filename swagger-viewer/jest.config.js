module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    // buildされたファイルを検知させないため
    "dist",
    "packages",
  ],
}
