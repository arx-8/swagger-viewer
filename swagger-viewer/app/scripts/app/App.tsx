import * as React from "react"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import { swaggerStr } from "./swaggerJson"

export interface AppProps {}

const App: React.SFC<AppProps> = () => (
  <>
    {/* <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" /> */}
    <SwaggerUI spec={swaggerStr} />
  </>
)

export default App
