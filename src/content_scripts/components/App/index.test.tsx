import { render } from "@testing-library/react"
import "jest-styled-components"
import * as React from "react"
import { convertToObject } from "src/content_scripts/utils/YmlUtils"
import { App } from "."
import { swaggerJson_2_0 } from "./fixtures/SwaggerJson_2_0"
import { swaggerYaml_2_0 } from "./fixtures/SwaggerYaml_2_0"
import { swaggerYaml_3_0 } from "./fixtures/SwaggerYaml_3_0"

describe("Render test", () => {
  beforeAll(() => {
    // Suppress warning about componentWillUpdate
    console.warn = () => undefined
  })

  it("invalid swagger", () => {
    // ## Arrange ##
    const swaggerJson = ""

    // ## Act ##
    const rendered = render(<App swaggerJson={swaggerJson} />)

    // ## Assert ##
    expect(rendered.asFragment()).toMatchSnapshot()
  })

  it("Swagger yaml 2.0", () => {
    // ## Arrange ##
    const swaggerJson = convertToObject(swaggerYaml_2_0)
    if (swaggerJson == null) {
      throw new Error("Invalid fixture")
    }

    // ## Act ##
    const rendered = render(<App swaggerJson={swaggerJson} />)

    // ## Assert ##
    expect(rendered.asFragment()).toMatchSnapshot()
  })

  it("Swagger yaml 3.0", () => {
    // ## Arrange ##
    const swaggerJson = convertToObject(swaggerYaml_3_0)
    if (swaggerJson == null) {
      throw new Error("Invalid fixture")
    }

    // ## Act ##
    const rendered = render(<App swaggerJson={swaggerJson} />)

    // ## Assert ##
    expect(rendered.asFragment()).toMatchSnapshot()
  })

  it("Swagger json 2.0", () => {
    // ## Arrange ##
    const swaggerJson = convertToObject(swaggerJson_2_0)
    if (swaggerJson == null) {
      throw new Error("Invalid fixture")
    }

    // ## Act ##
    const rendered = render(<App swaggerJson={swaggerJson} />)

    // ## Assert ##
    expect(rendered.asFragment()).toMatchSnapshot()
  })
})
