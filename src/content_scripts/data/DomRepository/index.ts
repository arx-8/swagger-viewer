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
  const selector1 =
    isInitial != null && isInitial
      ? `#repo-content-turbo-frame div.Box-body table`
      : `#repo-content-turbo-frame div.Box-body table.${ORIGINAL_SRC_AREA_CLASS}`
  {
    const elm1 = querySelector(selector1)
    if (elm1?.textContent?.length != null && elm1.textContent.length !== 0) {
      return elm1
    }
  }

  // fallback. The id changes depending on the state. For example, secret browse or direct link.
  const selector2 =
    isInitial != null && isInitial
      ? `#repo-content-pjax-container div.Box-body table`
      : `#repo-content-pjax-container div.Box-body table.${ORIGINAL_SRC_AREA_CLASS}`
  {
    const elm2 = querySelector(selector2)
    if (elm2?.textContent?.length != null && elm2.textContent.length !== 0) {
      return elm2
    }
  }

  // fallback for the new code view (2023)
  const selector3 =
    isInitial != null && isInitial
      ? `#repo-content-pjax-container section[aria-labelledby="file-name-id"]`
      : `#repo-content-pjax-container section[aria-labelledby="file-name-id"].${ORIGINAL_SRC_AREA_CLASS}`
  {
    const elm3 = querySelector(selector3)
    if (elm3?.textContent?.length != null && elm3.textContent.length !== 0) {
      return elm3
    }
  }

  throw new Error(
    `Unexpected DOM. Probably GitHub has been updated. Please contact the developer or wait until the extension is fixed. selector1: "${selector1}", selector2: "${selector2}, selector3: "${selector3}"`
  )
}

export const extractSrc = (): string => {
  const elm = getElmOfSrcCode()

  if (elm.textContent == null) {
    throw new Error("Unexpected null")
  }

  const selector1 = "td.blob-code"
  {
    const lines = querySelectorAll(selector1)
    if (lines.length !== 0) {
      return lines.map((td) => td.textContent).join("\n")
    }
  }

  const selector2 = "div.react-code-line-contents"
  {
    const lines = querySelectorAll(selector2)
    if (lines.length !== 0) {
      return lines.map((div) => div.textContent).join("\n")
    }
  }

  throw new Error(
    `Unexpected source code DOM. Probably GitHub has been updated. Please contact the developer or wait until the extension is fixed. selector1: "${selector1}", selector2: "${selector2}"`
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
