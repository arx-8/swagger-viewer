import { APP_RENDER_ID } from "../../../shared/constants/App"
import { getDocument } from "../QuerySelector/Document"

/**
 * DOMアクセス全般を実装する
 */
const RX_SWAGGER_PAGE = /^https:\/\/github\.com\/.*\.(ya?ml|json)$/

export const isAcceptableLocation = (): boolean => {
  return RX_SWAGGER_PAGE.test(getDocument().location.href)
}

export const isConverted = (): boolean => {
  return getDocument().querySelector(`#${APP_RENDER_ID}`) != null
}

export const getElmOfSrcCode = (): HTMLElement => {
  const selector = "div.container div.Box > div.Box-body > table"
  const element = getDocument().querySelector(selector)

  if (
    element == null ||
    element.textContent == null ||
    element.textContent.length === 0
  ) {
    throw new Error(`Unexpected DOM. selector:${selector}`)
  }

  return element as HTMLElement
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
      .map((line) => line.replace(/^ {8}/, ""))
      .join("\n")
  )
}

export const removeSrcCodeDom = (): void => {
  const elm = getElmOfSrcCode()

  // 今は必ず1要素。自身ごと削除すると、後でDOM injectするのが大変なためchildをremove
  elm.children[0].remove()
}

/**
 * Swaggerの各エンドポイント定義のヘッダー部分を取得して返す
 * @param {boolean} isOpened true: 開いてる状態のヘッダーのみ取得 | false: 閉じている状態のヘッダーのみ取得
 */
export const getElmOfSwaggerEndPointDefHeaders = (
  isOpened: boolean,
): readonly HTMLDivElement[] => {
  if (isOpened) {
    return querySelectorAll("div.opblock.is-open > .opblock-summary") as any
  }
  return querySelectorAll("div.opblock:not(.is-open) > .opblock-summary") as any
}

/**
 * Swaggerの各Model定義の開閉アイコン部分を取得して返す
 * @param {boolean} isOpened true: 開いてる状態のヘッダーのみ取得 | false: 閉じている状態のヘッダーのみ取得
 */
export const getElmOfSwaggerSchemasModelHeaders = (
  isOpened: boolean,
): readonly HTMLDivElement[] => {
  if (isOpened) {
    return querySelectorAll(
      "span.model-box span.model-toggle:not(.collapsed)",
    ) as any
  }
  return querySelectorAll("span.model-box span.model-toggle.collapsed") as any
}
