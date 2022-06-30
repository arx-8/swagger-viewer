import * as React from "react"
import ReactDOM from "react-dom"
import { getDocument } from "src/content_scripts/data/QuerySelector/Document"
import { APP_RENDER_ID } from "src/universal/types/App"
import { MaybeSwaggerJson } from "src/universal/types/Swagger"
import { App } from "./App"

export const render = (swaggerJson: MaybeSwaggerJson | string): void => {
  ReactDOM.render(
    <App swaggerJson={swaggerJson} />,
    getDocument().getElementById(APP_RENDER_ID)
  )
}
