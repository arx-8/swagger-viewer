import "swagger-ui-react/swagger-ui.css"

import * as React from "react"
import styled from "styled-components"
import SwaggerUI from "swagger-ui-react"

import { MaybeSwaggerJson } from "../../../shared/types/Swagger"
import { range } from "../../../shared/utils/ArrayUtils"
import { sleep } from "../../../shared/utils/SystemUtils"
import {
  getElmOfSwaggerDefOpener,
  getElmOfSwaggerEndPointDefHeaders,
  getElmOfSwaggerSchemasModelHeaders,
} from "../../data/DomRepository"
import { Button } from "../Button"

type Props = {
  /**
   * Swaggerではないjsonを読み込んだ場合、エラーメッセージを表示可能で有用。
   * そのため、無効なjsonでも読み込ませる
   */
  swaggerJson: MaybeSwaggerJson | string
}

export const App: React.FC<Props> = ({ swaggerJson }) => {
  return (
    <Root>
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
    </Root>
  )
}

const onClickExpandAll = async (): Promise<void> => {
  const isOpened = false
  getElmOfSwaggerDefOpener(isOpened).forEach((e) => e.click())
  await sleep(100)

  getElmOfSwaggerEndPointDefHeaders(isOpened).forEach((e) => e.click())

  // ネストしたModelを全て展開する
  // 無限ループにさせないため、ある程度の数で打ち切る
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ of range(0, 10)) {
    const targets = getElmOfSwaggerSchemasModelHeaders(isOpened)
    if (targets.length === 0) {
      break
    }
    targets.forEach((e) => e.click())

    // 空振り防止のための描画待ち
    await sleep(300)
  }
}

const onClickCollapseAll = (): void => {
  const isOpened = true
  // 全ての Open 状態に対して「閉じる」ため、再帰処理は不要
  getElmOfSwaggerEndPointDefHeaders(isOpened).forEach((e) => e.click())
  getElmOfSwaggerSchemasModelHeaders(isOpened).forEach((e) => e.click())
  getElmOfSwaggerDefOpener(isOpened).forEach((e) => e.click())
}

const Root = styled.div`
  background-color: #fff;
`

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
  padding: 0 5px 5px 0;

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
