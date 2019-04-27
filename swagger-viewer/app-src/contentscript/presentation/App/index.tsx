import * as React from "react"
import styled from "styled-components"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import { MaybeSwaggerJson } from "../../../shared/types/Swagger"
import { Button } from "../Button"

export interface AppProps {
  /**
   * Swaggerではないjsonを読み込んだ場合、エラーメッセージを表示可能で有用。
   * そのため、無効なjsonでも読み込ませる
   */
  swaggerJson: MaybeSwaggerJson | string
}

export const App: React.FC<AppProps> = ({ swaggerJson }) => {
  return (
    <>
      <Header>
        <Button onClick={onClickExpandAll}>Expand All</Button>
      </Header>
      <SwaggerUI spec={swaggerJson} />
    </>
  )
}

const onClickExpandAll = () => {
  // TODO
  alert("Hello")
}

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 5px 0 0;
`
