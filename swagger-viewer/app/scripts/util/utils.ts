const RX_SWAGGER_PAGE = /^https:\/\/github\.com\/.*\.(ya?ml|json)$/

export const isAcceptableLocation = (locationHref: string): boolean => {
  return RX_SWAGGER_PAGE.test(locationHref)
}

export const extractSrc = (): string => {
  const selector = "div.container div.Box > div.Box-body > table > tbody"
  const element = document.querySelector(selector)

  if (
    element == null ||
    element.textContent == null ||
    element.textContent.length === 0
  ) {
    console.error("Unexpected DOM. selector:" + selector)
    return ""
  }

  return (
    element.textContent
      .trim()
      .split("\n")
      // 半角スペースだけの空行が取得できてしまうため
      .filter((line) => line.trim().length !== 0)
      // 余分なインデントの削除
      .map((line) => line.replace(/^        /, ""))
      .join("\n")
  )
}
