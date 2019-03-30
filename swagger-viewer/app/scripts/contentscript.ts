import jsYaml from "js-yaml"
import { render } from "./app"
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

  removeSrcCodeDom()
  inject()
  render(swaggerJson)
  console.log("rendered")
}

const inject = (): void => {
  // 元srcを削除

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

  console.log("injected")

  global.Buffer = global.Buffer || require("buffer").Buffer
}

main()
