import jsYaml from "js-yaml"
import { render } from "./app"
import { EXEC_CONVERT_SWAGGER } from "./SendMessageKey"
import {
  extractSrc,
  getElmOfSrcCode,
  isAcceptableLocation,
  removeSrcCodeDom,
} from "./util/utils"

const main = (): void => {
  console.log("contentscript.ts")

  if (!isAcceptableLocation(document.location.href)) {
    console.log("Not isAcceptableLocation")
    return
  }

  const srcCode = extractSrc()
  const swaggerJson = jsYaml.safeLoad(srcCode)

  inject()
  render(swaggerJson)
  console.log("rendered")
}

const inject = (): void => {
  // 元srcを削除
  removeSrcCodeDom()

  // 元srcのところにrenderするため
  const injWrapper = document.createElement("div")
  injWrapper.innerHTML = `
  <script>
    var global = global || window;
  </script>
  <div id="swagger-viewer_root"><div>
  `

  const elm = getElmOfSrcCode()
  elm.appendChild(injWrapper)
  elm.style.width = "-webkit-fill-available"

  console.log("injected")

  global.Buffer = global.Buffer || require("buffer").Buffer
}

main()

chrome.runtime.onMessage.addListener((message) => {
  if (message.method == EXEC_CONVERT_SWAGGER) {
    console.log("onMessage contentscript")
  }
})
