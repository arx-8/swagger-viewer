import jsYaml from "js-yaml"
import * as React from "react"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import { swaggerStr } from "./swaggerYaml"

export interface AppProps {}

const ymlJson = jsYaml.safeLoad(swaggerStr)
console.log(ymlJson)

const App: React.FC<AppProps> = () => (
  <>
    <SwaggerUI spec={ymlJson} />
  </>
)

export default App
