import * as React from "react"
import ReactDOM from "react-dom"
import { APP_RENDER_ID } from "../constants/App"
import { MaybeSwaggerJson } from "../types/Swagger"
import App from "./App"

export const render = (swaggerJson: MaybeSwaggerJson | null) => {
  ReactDOM.render(
    <App swaggerJson={swaggerJson} />,
    document.getElementById(APP_RENDER_ID),
  )
}
