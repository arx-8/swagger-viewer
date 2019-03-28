import { render } from "./app"
import { extractYamlText, isAcceptableLocation } from "./util/utils"

const main = (): void => {
  console.log("contentscript.ts")

  if (!isAcceptableLocation(document.location.href)) {
    console.log("Not isAcceptableLocation")
    return
  }

  const yaml = extractYamlText()

  const injWrapper = document.createElement("div")
  injWrapper.innerHTML = `
  <script>
    var global = global || window;
  </script>
  <div id="swagger-viewer_root"><div>
  `
  document.body.appendChild(injWrapper)
  console.log("injected")

  global.Buffer = global.Buffer || require("buffer").Buffer

  render()
  console.log("rendered")
}

main()
