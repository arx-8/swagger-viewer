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
  injWrapper.id = "swagger-viewer_root"
  document.body.appendChild(injWrapper)
  console.log("injected")

  render()
  console.log("rendered")
}

main()
