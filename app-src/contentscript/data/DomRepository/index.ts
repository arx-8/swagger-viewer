import { APP_RENDER_ID } from "../../../shared/constants/App"
import { CastAny } from "../../../shared/types/utils"
import {
  querySelector,
  querySelectorAll,
  querySelectorStrict,
} from "../QuerySelector"

/**
 * DOMアクセス全般を実装する
 */
const RX_SWAGGER_PAGE =
  /^https:\/\/github\.com\/.*\.(ya?ml|json)($|#L\d+$|#L\d+-L\d+$)/

export const isAcceptableLocation = (documentInstance: Document): boolean => {
  return RX_SWAGGER_PAGE.test(documentInstance.location.href)
}

export const isConverted = (): boolean => {
  return querySelector(`#${APP_RENDER_ID}`) != null
}

export const getElmOfSrcCode = (): HTMLElement => {
  const selector = "#repo-content-pjax-container div.Box-body table"
  const element = querySelector(selector)

  // console.log("----------------------")
  // console.log("----------------------")
  // console.log("----------------------")
  // console.log(element?.textContent)
  // console.log("----------------------")
  // console.log("----------------------")
  // console.log("----------------------")

  if (
    element?.textContent?.length == null ||
    element.textContent.length === 0
  ) {
    throw new Error(
      `Unexpected DOM. Probably GitHub has been updated. Please contact the developer or wait until the extension is fixed. selector: "${selector}"`
    )
  }

  return element
}

export const extractSrc = (): string => {
  const elm = getElmOfSrcCode()

  if (elm.textContent == null) {
    throw new Error("Unexpected null")
  }

  return (
    elm.textContent
      .trim()
      .split("\n")
      // 各行の間に半角スペースだけの空行が取得できてしまうため
      .filter((line) => line.trim().length !== 0)
      // 各行の prefix に余分なインデントが付いているため、それを削除する
      .map((line) => line.replace(/^ {10}/, ""))
      .join("\n")
  )
}

export const toggleAppOrSrcCodeDom = (): void => {
  const elm = getElmOfSrcCode()

  // 今は必ず1要素。自身ごと削除すると、DOM injectするのが大変なためchildを扱う
  const srcDom = elm.children[0] as HTMLElement
  if (srcDom.style.display === "none") {
    // App -> src
    srcDom.style.display = ""
    querySelectorStrict(`#${APP_RENDER_ID}`).style.display = "none"
  } else {
    // src -> App
    srcDom.style.display = "none"
    querySelectorStrict(`#${APP_RENDER_ID}`).style.display = ""
  }
}

/**
 * API定義・Modelsのタイトル（サマリー）の開閉エリアを取得して返す
 */
export const getElmOfSwaggerDefOpener = (
  isOpened: boolean
): readonly HTMLButtonElement[] => {
  if (isOpened) {
    const apiDefs = querySelectorAll(
      `.opblock-tag-section .opblock-tag[data-is-open="true"]`
    )
    const modelDefs = querySelectorAll(`section.models.is-open > h4`)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [...apiDefs, ...modelDefs] as CastAny
  }

  const apiDefs = querySelectorAll(
    `.opblock-tag-section .opblock-tag[data-is-open="false"] button`
  )
  const modelDefs = querySelectorAll(`section.models:not(.is-open) > h4`)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [...apiDefs, ...modelDefs] as CastAny
}

/**
 * Swaggerの各エンドポイント定義のヘッダー部分を取得して返す
 * @param {boolean} isOpened true: 開いてる状態のヘッダーのみ取得 | false: 閉じている状態のヘッダーのみ取得
 */
export const getElmOfSwaggerEndPointDefHeaders = (
  isOpened: boolean
): readonly HTMLDivElement[] => {
  if (isOpened) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return querySelectorAll("div.opblock.is-open > .opblock-summary") as CastAny
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return querySelectorAll(
    "div.opblock:not(.is-open) > .opblock-summary"
  ) as CastAny
}

/**
 * Swaggerの各Model定義の開閉アイコン部分を取得して返す
 * @param {boolean} isOpened true: 開いてる状態のヘッダーのみ取得 | false: 閉じている状態のヘッダーのみ取得
 */
export const getElmOfSwaggerSchemasModelHeaders = (
  isOpened: boolean
): readonly HTMLDivElement[] => {
  if (isOpened) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return querySelectorAll(
      "span.model-box span.model-toggle:not(.collapsed)"
    ) as CastAny
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return querySelectorAll(
    "span.model-box span.model-toggle.collapsed"
  ) as CastAny
}
