import * as React from "react"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import { MaybeSwaggerJson } from "../../types/Swagger"

export interface AppProps {
  /**
   * Swaggerではないjsonを読み込んだ場合、エラーメッセージを表示可能で有用。
   * そのため、無効なjsonでも読み込ませる
   */
  swaggerJson: MaybeSwaggerJson | null
}

export const App: React.FC<AppProps> = ({ swaggerJson }) => {
  return <SwaggerUI spec={swaggerJson} />
}
