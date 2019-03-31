import jsYaml from "js-yaml"
import { render } from "./app"
import { APP_RENDER_ID } from "./constants/App"
import { EXEC_CONVERT_SWAGGER } from "./constants/SendMessageKey"
import { MaybeSwaggerJson } from "./types/App"
import {
  extractSrc,
  getElmOfSrcCode,
  isAcceptableLocation,
  isConverted,
  removeSrcCodeDom,
} from "./util/utils"

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
  const swaggerJson: MaybeSwaggerJson = jsYaml.safeLoad(srcCode)

  inject()
  render(swaggerJson)
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

  global.Buffer = global.Buffer || require("buffer").Buffer
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.method == EXEC_CONVERT_SWAGGER) {
    execConvertSwagger()
  }
})
