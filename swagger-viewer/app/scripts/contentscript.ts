import { render } from "./contentscript/app"
import {
  extractSrc,
  getElmOfSrcCode,
  isAcceptableLocation,
  isConverted,
  removeSrcCodeDom,
} from "./contentscript/util/utils"
import { convertToObject } from "./contentscript/util/YmlUtils"
import { APP_RENDER_ID } from "./shared/constants/App"
import { EXEC_CONVERT_SWAGGER } from "./shared/constants/SendMessageTypes"
import { ExecConvertSwaggerMessage } from "./shared/types/SendMessage"

const execConvertSwagger = (): void => {
  console.log("Start convert")

  if (!isAcceptableLocation(document.location.href)) {
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
  const injWrapper = document.createElement("div")
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

  // eslint-disable-next-line global-require
  global.Buffer = global.Buffer || require("buffer").Buffer
}

chrome.runtime.onMessage.addListener((message: ExecConvertSwaggerMessage) => {
  if (message.type === EXEC_CONVERT_SWAGGER) {
    execConvertSwagger()
  }
})
