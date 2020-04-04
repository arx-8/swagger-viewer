import { CastAny } from "../../../shared/types/utils"
import { yml as case2_yml } from "./fixtures/case2"
import { convertToObject } from "."

describe("convertToObject / convertable", () => {
  it("null", () => {
    // ## Arrange ##
    const src = null
    // ## Act ##
    const result = convertToObject(src as CastAny)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`null`)
  })

  it("empty string", () => {
    // ## Arrange ##
    const src = ``
    // ## Act ##
    const result = convertToObject(src)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`null`)
  })

  it("no swagger string", () => {
    // ## Arrange ##
    const src = `any string literal`
    // ## Act ##
    const result = convertToObject(src)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`null`)
  })

  it("yaml string", () => {
    // ## Arrange ##
    const src = `
swagger: "2.0"
info:
  title: Simple API overview
paths:
  /:
    get:
      operationId: listVersionsv2
      produces:
      - application/json
      responses:
        "200":
          description: |-
            200 300 response
consumes:
- application/json
`
    // ## Act ##
    const result = convertToObject(src)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`
      Object {
        "consumes": Array [
          "application/json",
        ],
        "info": Object {
          "title": "Simple API overview",
        },
        "paths": Object {
          "/": Object {
            "get": Object {
              "operationId": "listVersionsv2",
              "produces": Array [
                "application/json",
              ],
              "responses": Object {
                "200": Object {
                  "description": "200 300 response",
                },
              },
            },
          },
        },
        "swagger": "2.0",
      }
    `)
  })

  it("yaml string case2", () => {
    // ## Arrange ##
    // ## Act ##
    const result = convertToObject(case2_yml)
    // ## Assert ##
    expect(result).toMatchSnapshot()
  })

  it("json string", () => {
    // ## Arrange ##
    const src = `
{
  "a": "a",
  "b": 2,
  "cc": null,
}
`
    // ## Act ##
    const result = convertToObject(src)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`
      Object {
        "a": "a",
        "b": 2,
        "cc": null,
      }
    `)
  })
})

describe("convertToObject / broken string", () => {
  describe("broken json string", () => {
    it("case:1", () => {
      // ## Arrange ##
      const src = `
{
  "a": "a",
  "b": 2,
  "cc": null,
`
      // ## Act ##
      // ## Assert ##
      expect(() => {
        convertToObject(src)
      }).toThrowErrorMatchingInlineSnapshot(`
"unexpected end of the stream within a flow collection at line 6, column 1:
    
    ^"
`)
    })

    it("case:2", () => {
      // ## Arrange ##
      const src = `
{
  "a": "a"
  "b": 2,
  "cc": null,
}
`
      // ## Act ##
      // ## Assert ##
      expect(() => {
        convertToObject(src)
      }).toThrowErrorMatchingInlineSnapshot(`
"missed comma between flow collection entries at line 4, column 3:
      \\"b\\": 2,
      ^"
`)
    })
  })

  describe("broken yaml string", () => {
    it("case:1", () => {
      // ## Arrange ##
      const src = `
swagger: "2.0"
info:
                title: Simple API overview
paths:
  /:
    get: operationId: listVersionsv2
      produces:
      - application/json
      responses:
        "200":
          description: |-
            200 300 response
consumes:
- application/json
`
      // ## Act ##
      // ## Assert ##
      expect(() => {
        convertToObject(src)
      }).toThrowErrorMatchingInlineSnapshot(`
"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line at line 7, column 21:
        get: operationId: listVersionsv2
                        ^"
`)
    })

    it("case:2", () => {
      // ## Arrange ##
      const src = `
swagger: "2.0"
info:
  title: Simple API overview
paths:
  /:
    get:
              operationId: listVersionsv2
      produces:
application/json
      responses:
        "200":
          description: |-
            200 300 response
consumes:

`
      // ## Act ##
      // ## Assert ##
      expect(() => {
        convertToObject(src)
      }).toThrowErrorMatchingInlineSnapshot(`
"bad indentation of a mapping entry at line 9, column 7:
          produces:
          ^"
`)
    })
  })
})
