import "jest-styled-components"
import * as React from "react"
import { create } from "react-test-renderer"
import ShallowRenderer from "react-test-renderer/shallow"
import { convertToObject } from "src/content_scripts/utils/YmlUtils"
import { App } from "."
import { swaggerJson_2_0 } from "./fixtures/SwaggerJson_2_0"
import { swaggerYaml_2_0 } from "./fixtures/SwaggerYaml_2_0"
import { swaggerYaml_3_0 } from "./fixtures/SwaggerYaml_3_0"

describe("Shallow render test", () => {
  beforeAll(() => {
    // Suppress warning about componentWillUpdate
    console.warn = () => undefined
  })

  it("shallow render and snapshot", () => {
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
  beforeAll(() => {
    // Suppress warning about componentWillUpdate
    console.warn = () => undefined
  })

  it("invalid swagger", () => {
    // ## Arrange ##
    const swaggerJson = ""
    // ## Act ##
    const result = create(<App swaggerJson={swaggerJson} />)
    // ## Assert ##
    expect(result).toMatchSnapshot()
  })

  it("Swagger yaml 2.0", () => {
    // ## Arrange ##
    const swaggerJson = convertToObject(swaggerYaml_2_0)
    if (swaggerJson == null) {
      throw new Error("Invalid fixture")
    }
    // ## Act ##
    const result = create(<App swaggerJson={swaggerJson} />)
    // ## Assert ##
    expect(result).toMatchSnapshot()
  })

  it("Swagger yaml 3.0", () => {
    // ## Arrange ##
    const swaggerJson = convertToObject(swaggerYaml_3_0)
    if (swaggerJson == null) {
      throw new Error("Invalid fixture")
    }
    // ## Act ##
    const result = create(<App swaggerJson={swaggerJson} />)
    // ## Assert ##
    expect(result).toMatchSnapshot()
  })

  it("Swagger json 2.0", () => {
    // ## Arrange ##
    const swaggerJson = convertToObject(swaggerJson_2_0)
    if (swaggerJson == null) {
      throw new Error("Invalid fixture")
    }
    // ## Act ##
    const result = create(<App swaggerJson={swaggerJson} />)
    // ## Assert ##
    expect(result).toMatchSnapshot()
  })
})
