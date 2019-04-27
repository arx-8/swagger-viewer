import * as React from "react"
import styled from "styled-components"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import { MaybeSwaggerJson } from "../../../shared/types/Swagger"
import {
  getElmOfSwaggerEndPointDefHeaders,
  getElmOfSwaggerSchemasModelHeaders,
} from "../../data/DomRepository"
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
        <Button onClick={onClickCollapseAll}>Collapse All</Button>
      </Header>
      <SwaggerUIWrapper>
        <SwaggerUI spec={swaggerJson} />
      </SwaggerUIWrapper>
      <Footer>
        <Button onClick={onClickExpandAll}>Expand All</Button>
        <Button onClick={onClickCollapseAll}>Collapse All</Button>
      </Footer>
    </>
  )
}

const onClickExpandAll = () => {
  const isOpend = false
  getElmOfSwaggerEndPointDefHeaders(isOpend).forEach((e) => e.click())
  getElmOfSwaggerSchemasModelHeaders(isOpend).forEach((e) => e.click())
}

const onClickCollapseAll = () => {
  const isOpend = true
  getElmOfSwaggerEndPointDefHeaders(isOpend).forEach((e) => e.click())
  getElmOfSwaggerSchemasModelHeaders(isOpend).forEach((e) => e.click())
}

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 5px 0 0;

  & > button {
    margin-left: 3px;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 5px 0 0;

  & > button {
    margin-left: 3px;
  }
`

const SwaggerUIWrapper = styled.div`
  & > .swagger-ui .information-container.wrapper .info {
    /* トップに無駄な余白を取っているため */
    margin: 0 !important;
  }
`
