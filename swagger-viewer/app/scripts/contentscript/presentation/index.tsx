import * as React from "react"
import ReactDOM from "react-dom"
import { APP_RENDER_ID } from "../../shared/constants/App"
import { MaybeSwaggerJson } from "../../shared/types/Swagger"
import { App } from "./App"

export const render = (swaggerJson: MaybeSwaggerJson | string) => {
  ReactDOM.render(
    <App swaggerJson={swaggerJson} />,
    document.getElementById(APP_RENDER_ID),
  )
}
