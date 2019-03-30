const RX_SWAGGER_PAGE = /^https:\/\/github\.com\/.*\.(ya?ml|json)$/

export const isAcceptableLocation = (locationHref: string): boolean => {
  return RX_SWAGGER_PAGE.test(locationHref)
}

export const extractSrc = (): string => {
  const elm = getElmOfSrcCode()

  if (!elm.textContent) {
    throw new Error("Unexpected null")
  }

  return (
    elm.textContent
      .trim()
      .split("\n")
      // 半角スペースだけの空行が取得できてしまうため
      .filter((line) => line.trim().length !== 0)
      // 余分なインデントの削除
      .map((line) => line.replace(/^        /, ""))
      .join("\n")
  )
}

export const removeSrcCodeDom = (): void => {
  const elm = getElmOfSrcCode()

  // 今は必ず1要素。自身ごと削除すると、後でDOM injectするのが大変なためchildをremove
  elm.children[0].remove()
}

export const getElmOfSrcCode = (): Element => {
  const selector = "div.container div.Box > div.Box-body > table"
  const element = document.querySelector(selector)

  if (
    element == null ||
    element.textContent == null ||
    element.textContent.length === 0
  ) {
    throw new Error("Unexpected DOM. selector:" + selector)
  }

  return element
}
