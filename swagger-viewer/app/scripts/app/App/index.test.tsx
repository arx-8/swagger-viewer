import * as React from "react"
import { create } from "react-test-renderer"
import ShallowRenderer from "react-test-renderer/shallow"
import { App } from "."

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
})
