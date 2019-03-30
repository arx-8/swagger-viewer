import * as React from "react"
import ReactDOM from "react-dom"
import App from "./App"

export const render = (swaggerJson: Object) => {
  ReactDOM.render(
    <App swaggerJson={swaggerJson} />,
    document.getElementById("swagger-viewer_root"),
  )
}
