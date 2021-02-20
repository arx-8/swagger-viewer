import * as React from "react"
import ReactDOM from "react-dom"
import { APP_RENDER_ID } from "../../shared/constants/App"
import { MaybeSwaggerJson } from "../../shared/types/Swagger"
import { getDocument } from "../data/QuerySelector/Document"
import { App } from "./App"

export const render = (swaggerJson: MaybeSwaggerJson | string): void => {
  ReactDOM.render(
    <App swaggerJson={swaggerJson} />,
    getDocument().getElementById(APP_RENDER_ID)
  )
}
