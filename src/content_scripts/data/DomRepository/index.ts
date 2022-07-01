import {
  querySelector,
  querySelectorAll,
  querySelectorStrict,
} from "src/content_scripts/data/QuerySelector"
import { APP_RENDER_ID, ORIGINAL_SRC_AREA_CLASS } from "src/universal/types/App"
import { CastAny } from "src/universal/types/utils"

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

/**
 * @param isInitial == is not injected
 */
export const getElmOfSrcCode = (isInitial?: boolean): HTMLElement => {
  // Swagger-UI also has a DOM in the same path, resulting in a miss-hit.
  // To avoid this, after injection, it is searched with its own className.
  const selector =
    isInitial != null && isInitial
      ? `#repo-content-pjax-container div.Box-body table`
      : `#repo-content-pjax-container div.Box-body table.${ORIGINAL_SRC_AREA_CLASS}`

  const element = querySelector(selector)

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

/**
 * Toggle Swagger-UI or Original src
 */
export const toggleAppOrSrcCodeDom = (): void => {
  const elm = getElmOfSrcCode()

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
  currentOpen: boolean
): readonly HTMLButtonElement[] => {
  if (currentOpen) {
    // for tag headers
    const apiDefs = querySelectorAll(
      `#${APP_RENDER_ID} .opblock-tag-section .opblock-tag[data-is-open="true"]`
    )

    // for "Schemas"
    const modelDefs = querySelectorAll(
      `#${APP_RENDER_ID} section.models.is-open button`
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [...apiDefs, ...modelDefs] as CastAny
  }

  const apiDefs = querySelectorAll(
    `#${APP_RENDER_ID} .opblock-tag-section .opblock-tag[data-is-open="false"] button`
  )
  const modelDefs = querySelectorAll(
    `#${APP_RENDER_ID} section.models:not(.is-open) button`
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [...apiDefs, ...modelDefs] as CastAny
}

/**
 * Swaggerの各エンドポイント定義のヘッダー部分を取得して返す
 * @param currentOpen true: 開いてる状態のヘッダーのみ取得 | false: 閉じている状態のヘッダーのみ取得
 */
export const getElmOfSwaggerEndPointDefHeaders = (
  currentOpen: boolean
): readonly HTMLDivElement[] => {
  if (currentOpen) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return querySelectorAll(
      `#${APP_RENDER_ID} div.opblock.is-open .opblock-summary button`
    ) as CastAny
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return querySelectorAll(
    `#${APP_RENDER_ID} div.opblock:not(.is-open) .opblock-summary button`
  ) as CastAny
}

/**
 * Swaggerの各Model定義の開閉アイコン部分を取得して返す
 * @param currentOpen true: 開いてる状態のヘッダーのみ取得 | false: 閉じている状態のヘッダーのみ取得
 */
export const getElmOfSwaggerSchemasModelHeaders = (
  currentOpen: boolean
): readonly HTMLDivElement[] => {
  if (currentOpen) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return querySelectorAll(
      `#${APP_RENDER_ID} span.model-box span.model-toggle:not(.collapsed)`
    ) as CastAny
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return querySelectorAll(
    `#${APP_RENDER_ID} span.model-box span.model-toggle.collapsed`
  ) as CastAny
}
