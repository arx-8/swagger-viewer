// regenerator-runtime/runtime for async/await
import "regenerator-runtime/runtime"

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

/* eslint-disable no-alert */

/**
 * contentscriptのエントリーポイント
 * backgroundからイベントを受け取って実行
 */
chrome.runtime.onMessage.addListener((message: ExecConvertSwaggerMessage) => {
  if (message.type === EXEC_CONVERT_SWAGGER) {
    execConvertSwagger()
  }
})

const execConvertSwagger = (): void => {
  console.log("Start convert")

  if (!isAcceptableLocation(getDocument())) {
    alert("No operation. Unsupported site.")
    return
  }

  if (!isConverted()) {
    // 描画前に、そもそも対象を処理できるか検査・変換しておく
    const srcCode = extractSrc()
    let swaggerJson
    try {
      swaggerJson = convertToObject(srcCode)
    } catch (_error) {
      const error: Error = _error
      alert(
        `No operation.
  Could not convert.
  [Cause] ${error.message}`
      )
      console.error(error.stack)
      return
    }

    injectApp()
    render(swaggerJson || "")
  }

  // App のアイコンをクリックされるたびに、src と swagger-ui を toggle する
  toggleAppOrSrcCodeDom()

  console.log("Convert completed")
}

/**
 * この App を描画するための DOM 等を inject する
 */
const injectApp = (): void => {
  // 元srcのところにrenderする
  const injWrapper = getDocument().createElement("div")
  injWrapper.innerHTML = `
<script>
  var global = global || window;
</script>
<div id="${APP_RENDER_ID}"><div>
`

  const elm = getElmOfSrcCode()
  elm.appendChild(injWrapper)
  elm.style.width = "-webkit-fill-available"

  // swagger-ui-reactの依存ライブラリのため追加
  // eslint-disable-next-line global-require
  global.Buffer = global.Buffer || require("buffer").Buffer

  console.log("injected")
}
