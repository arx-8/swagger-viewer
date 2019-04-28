import * as React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import { MaybeSwaggerJson } from "../../../shared/types/Swagger"
import { range } from "../../../shared/utils/ArrayUtils"
import { sleep } from "../../../shared/utils/SystemUtils"
import { exQuerySelectorAll } from "../../data/QuerySelector"
import { ActionBar } from "../ActionBar"

type Props = {
  /**
   * Swaggerではないjsonを読み込んだ場合、エラーメッセージを表示可能で有用。
   * そのため、無効なjsonでも読み込ませる
   */
  swaggerJson: MaybeSwaggerJson | string
}

export class App extends React.Component<Props> {
  private refSwaggerUI = React.createRef<HTMLDivElement>()

  extractSwaggerUIElement = (): HTMLElement => {
    const elm = ReactDOM.findDOMNode(this.refSwaggerUI.current)
    // Jestからコールされた場合
    if (elm instanceof Object) {
      console.log(elm)
    }
    if (elm == null || !(elm instanceof HTMLElement)) {
      throw new Error("Logic Failure. Valid element not found.")
    }
    return elm
  }

  /**
   * Swaggerの各エンドポイント定義のヘッダー部分を取得して返す
   * @param {boolean} isOpened true: 開いてる状態のヘッダーのみ取得 | false: 閉じている状態のヘッダーのみ取得
   */
  getElmOfSwaggerEndPointDefHeaders = (
    isOpened: boolean,
  ): readonly HTMLDivElement[] => {
    const elm = this.extractSwaggerUIElement()

    if (isOpened) {
      return exQuerySelectorAll(elm, "div.opblock.is-open > .opblock-summary")
    }
    return exQuerySelectorAll(
      elm,
      "div.opblock:not(.is-open) > .opblock-summary",
    )
  }

  /**
   * Swaggerの各Model定義の開閉アイコン部分を取得して返す
   * @param {boolean} isOpened true: 開いてる状態のヘッダーのみ取得 | false: 閉じている状態のヘッダーのみ取得
   */
  getElmOfSwaggerSchemasModelHeaders = (
    isOpened: boolean,
  ): readonly HTMLDivElement[] => {
    const elm = this.extractSwaggerUIElement()

    if (isOpened) {
      return exQuerySelectorAll(
        elm,
        "span.model-box span.model-toggle:not(.collapsed)",
      )
    }
    return exQuerySelectorAll(elm, "span.model-box span.model-toggle.collapsed")
  }

  onClickExpandAll = async () => {
    const isOpend = false
    this.getElmOfSwaggerEndPointDefHeaders(isOpend).forEach((e) => e.click())

    // ネストしたModelを全て展開する
    // 無限ループにさせないため、ある程度の数で打ち切る
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of range(0, 10)) {
      const targets = this.getElmOfSwaggerSchemasModelHeaders(isOpend)
      if (targets.length === 0) {
        break
      }
      targets.forEach((e) => e.click())

      // 空振り防止のための描画待ち
      await sleep(300)
    }
  }

  onClickCollapseAll = () => {
    const isOpend = true
    // 全ての Open 状態に対して「閉じる」ため、再帰処理は不要
    this.getElmOfSwaggerEndPointDefHeaders(isOpend).forEach((e) => e.click())
    this.getElmOfSwaggerSchemasModelHeaders(isOpend).forEach((e) => e.click())
  }

  public render() {
    const { swaggerJson } = this.props

    return (
      <>
        <ActionBar
          onClickExpandAll={this.onClickExpandAll}
          onClickCollapseAll={this.onClickCollapseAll}
        />
        <SwaggerUIWrapper>
          <SwaggerUI spec={swaggerJson} ref={this.refSwaggerUI} />
        </SwaggerUIWrapper>
        <ActionBar
          onClickExpandAll={this.onClickExpandAll}
          onClickCollapseAll={this.onClickCollapseAll}
        />
      </>
    )
  }
}

const SwaggerUIWrapper = styled.div`
  & > .swagger-ui .information-container.wrapper .info {
    /* トップに無駄な余白を取っているため */
    margin: 0 !important;
  }
`
