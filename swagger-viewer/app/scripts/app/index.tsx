import * as React from "react"
import ReactDOM from "react-dom"
import { APP_RENDER_ID } from "../constants/App"
import App from "./App"

export const render = (swaggerJson: Object) => {
  ReactDOM.render(
    <App swaggerJson={swaggerJson} />,
    document.getElementById(APP_RENDER_ID),
  )
}
