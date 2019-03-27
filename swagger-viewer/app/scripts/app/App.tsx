import * as React from "react"
import { RedocStandalone } from "redoc"

export interface AppProps {}

const App: React.SFC<AppProps> = () => (
  <>
    <RedocStandalone specUrl="https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/yaml/api-with-examples.yaml" />
  </>
)

export default App
