import jsYaml from "js-yaml"
import * as React from "react"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import { extractSrc } from "../util/utils"

export interface AppProps {}

const srcCode = extractSrc()
const swaggerJson = jsYaml.safeLoad(srcCode)

const App: React.FC<AppProps> = () => {
  return (
    <>
      <SwaggerUI spec={swaggerJson} />
    </>
  )
}

export default App
