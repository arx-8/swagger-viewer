import {
  extractSrc,
  getElmOfSrcCode,
  isAcceptableLocation,
  isConverted,
  removeSrcCodeDom,
} from "./contentscript/data/DomRepository"
import { getDocument } from "./contentscript/data/QuerySelector/Document"
import { render } from "./contentscript/presentation"
import { convertToObject } from "./contentscript/util/YmlUtils"
import { APP_RENDER_ID } from "./shared/constants/App"
import { EXEC_CONVERT_SWAGGER } from "./shared/constants/SendMessageTypes"
import { ExecConvertSwaggerMessage } from "./shared/types/SendMessage"

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

  if (!isAcceptableLocation()) {
    console.log("Not isAcceptableLocation")
    return
  }
  if (isConverted()) {
    console.log("Already converted")
    return
  }

  const srcCode = extractSrc()
  const swaggerJson = convertToObject(srcCode)

  inject()
  render(swaggerJson || "")
  console.log("Convert completed")
}

const inject = (): void => {
  // 元srcを削除
  removeSrcCodeDom()

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

  console.log("injected")

  // swagger-ui-reactの依存ライブラリのため追加
  // eslint-disable-next-line global-require
  global.Buffer = global.Buffer || require("buffer").Buffer
}
