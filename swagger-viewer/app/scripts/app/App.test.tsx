import * as React from "react"
import ShallowRenderer from "react-test-renderer/shallow"
import App from "./App"

describe("Render test", () => {
  test("shallow render and snapshot", () => {
    // ## Arrange ##
    const renderer = ShallowRenderer.createRenderer()
    const swaggerJson: any = ""

    // ## Act ##
    renderer.render(<App swaggerJson={swaggerJson} />)
    const result = renderer.getRenderOutput()

    // ## Assert ##
    expect(result).toMatchSnapshot()
  })
})
