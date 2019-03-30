import * as React from "react"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export interface AppProps {
  swaggerJson: Object
}

const App: React.FC<AppProps> = ({ swaggerJson }) => {
  return (
    <>
      <SwaggerUI spec={swaggerJson} />
    </>
  )
}

export default App
