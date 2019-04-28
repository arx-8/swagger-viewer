import "jest-styled-components"
import * as React from "react"
import { create } from "react-test-renderer"
import ShallowRenderer from "react-test-renderer/shallow"
import { App } from "."
import { convertToObject } from "../../util/YmlUtils"
import { swaggerJson_2_0 } from "./fixtures/SwaggerJson_2_0"
import { swaggerYaml_2_0 } from "./fixtures/SwaggerYaml_2_0"
import { swaggerYaml_3_0 } from "./fixtures/SwaggerYaml_3_0"

describe("Shallow render test", () => {
  test("shallow render and snapshot", () => {
    // ## Arrange ##
    const renderer = ShallowRenderer.createRenderer()
    const swaggerJson = ""

    // ## Act ##
    renderer.render(<App swaggerJson={swaggerJson} />)
    const result = renderer.getRenderOutput()

    // ## Assert ##
    expect(result).toMatchSnapshot()
  })
})

describe("Render test", () => {
  test("invalid swagger", () => {
    // ## Arrange ##
    const swaggerJson = ""
    // ## Act ##
    const result = create(<App swaggerJson={swaggerJson} />)
    // ## Assert ##
    expect(result).toMatchSnapshot()
  })

  test("Swagger yaml 2.0", () => {
    // ## Arrange ##
    const swaggerJson = convertToObject(swaggerYaml_2_0)
    if (!swaggerJson) {
      throw new Error("Invalid fixture")
    }
    // ## Act ##
    const result = create(<App swaggerJson={swaggerJson} />)
    // ## Assert ##
    expect(result).toMatchSnapshot()
  })

  test("Swagger yaml 3.0 + event", async () => {
    // ## Arrange ##
    const swaggerJson = convertToObject(swaggerYaml_3_0)
    if (!swaggerJson) {
      throw new Error("Invalid fixture")
    }

    // ## Act ##
    const result = create(<App swaggerJson={swaggerJson} />)

    // かなりDOM実装依存・fragileだが、1つめの「"Expand All" button」を探してクリック
    const expandAllBtn = result.root.findAll((node) => {
      return (
        node.type === "button" &&
        node.children &&
        node.children[0] === "Expand All"
      )
    })[0]

    // TODO この simulate がないため？、ReactDOM.findDOMNode を超えてクリックイベントを実行することができない
    // よって、クリックイベント後の状態をassertすることは、現状不可能
    console.log(expandAllBtn.simulate("click"))
    await expandAllBtn.props.onClick()

    // ## Assert ##
    expect(result).toMatchSnapshot()
  })

  test("Swagger json 2.0", () => {
    // ## Arrange ##
    const swaggerJson = convertToObject(swaggerJson_2_0)
    if (!swaggerJson) {
      throw new Error("Invalid fixture")
    }
    // ## Act ##
    const result = create(<App swaggerJson={swaggerJson} />)
    // ## Assert ##
    expect(result).toMatchSnapshot()
  })
})
