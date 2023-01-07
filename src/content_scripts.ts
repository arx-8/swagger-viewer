import {
  APP_RENDER_ID,
  MessagePayload,
  ORIGINAL_SRC_AREA_CLASS,
} from "src/universal/types/App"
import { convertToObject } from "src/universal/utils/YmlUtils"
import { render } from "./content_scripts/components"
import {
  extractSrc,
  getElmOfSrcCode,
  isAcceptableLocation,
  isConverted,
  toggleAppOrSrcCodeDom,
} from "./content_scripts/data/DomRepository"
import { getDocument } from "./content_scripts/data/QuerySelector/Document"

/**
 * contentscriptのエントリーポイント
 * backgroundからイベントを受け取って実行
 */
chrome.runtime.onMessage.addListener((message: MessagePayload) => {
  if (message.type !== "CALL_CONVERT_SWAGGER") {
    return
  }

  try {
    execConvertSwagger()
  } catch (_error) {
    // TODO do not use as cast
    const error = _error as Error
    // eslint-disable-next-line no-alert
    alert(
      `No operation. Can not convert.

[Cause]
${error.message}`
    )
    console.error(error.stack)
  }
})

const execConvertSwagger = (): void => {
  if (!isAcceptableLocation(getDocument())) {
    throw new Error("Unsupported site or filename-extension.")
  }

  if (!isConverted()) {
    injectApp()

    const srcCode = extractSrc()
    const swaggerJson = convertToObject(srcCode)
    render(swaggerJson == null ? "" : swaggerJson)
  }

  // App のアイコンをクリックされるたびに、src と swagger-ui を toggle する
  toggleAppOrSrcCodeDom()
}

/**
 * Inject DOM etc. to render this App.
 */
const injectApp = (): void => {
  // For toggle Swagger-UI or Original src
  const origSrcArea = getElmOfSrcCode(true)
  origSrcArea?.classList.add(ORIGINAL_SRC_AREA_CLASS)

  // For swagger-ui
  const injWrapper = getDocument().createElement("div")
  injWrapper.innerHTML = `<div id="${APP_RENDER_ID}"><div>`

  const elm =
    getElmOfSrcCode()?.parentElement?.parentElement?.parentElement
      ?.parentElement
  if (elm != null) {
    elm.appendChild(injWrapper)
    elm.style.width = "-webkit-fill-available"
  }
}
