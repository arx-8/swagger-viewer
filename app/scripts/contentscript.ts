import {
  extractSrc,
  getElmOfSrcCode,
  isAcceptableLocation,
  isConverted,
  toggleAppOrSrcCodeDom,
} from "../../app-src/contentscript/data/DomRepository"
import { getDocument } from "../../app-src/contentscript/data/QuerySelector/Document"
import { render } from "../../app-src/contentscript/presentation"
import { convertToObject } from "../../app-src/contentscript/util/YmlUtils"
import { APP_RENDER_ID } from "../../app-src/shared/constants/App"
import { EXEC_CONVERT_SWAGGER } from "../../app-src/shared/constants/SendMessageTypes"
import { ExecConvertSwaggerMessage } from "../../app-src/shared/types/SendMessage"

/**
 * contentscriptのエントリーポイント
 * backgroundからイベントを受け取って実行
 */
chrome.runtime.onMessage.addListener((message: ExecConvertSwaggerMessage) => {
  if (message.type === EXEC_CONVERT_SWAGGER) {
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
  }
})

const execConvertSwagger = (): void => {
  if (!isAcceptableLocation(getDocument())) {
    throw new Error("Unsupported site or filename-extension.")
  }

  if (!isConverted()) {
    // 描画前に、そもそも対象を処理できるか検査・変換しておく
    const srcCode = extractSrc()
    const swaggerJson = convertToObject(srcCode)

    injectApp()
    render(swaggerJson == null ? "" : swaggerJson)
  }

  // App のアイコンをクリックされるたびに、src と swagger-ui を toggle する
  toggleAppOrSrcCodeDom()
}

/**
 * この App を描画するための DOM 等を inject する
 */
const injectApp = (): void => {
  // 元srcのところにrenderする
  const injWrapper = getDocument().createElement("div")
  injWrapper.innerHTML = `
<div id="${APP_RENDER_ID}"><div>
`

  const elm = getElmOfSrcCode()
  elm.appendChild(injWrapper)
  elm.style.width = "-webkit-fill-available"
}
