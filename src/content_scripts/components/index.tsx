import * as React from "react"
import ReactDOM from "react-dom"
import { APP_RENDER_ID } from "../../universal/constants/App"
import { MaybeSwaggerJson } from "../../universal/types/Swagger"
import { getDocument } from "../data/QuerySelector/Document"
import { App } from "./App"

export const render = (swaggerJson: MaybeSwaggerJson | string): void => {
  ReactDOM.render(
    <App swaggerJson={swaggerJson} />,
    getDocument().getElementById(APP_RENDER_ID)
  )
}
