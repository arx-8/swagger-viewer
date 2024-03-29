import { convertToObject } from "."
import { yml as case2_yml } from "./fixtures/case2"

describe("convertToObject / convertable", () => {
  it("undefined", () => {
    // ## Arrange ##
    const src = undefined
    // ## Act ##
    const result = convertToObject(src)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`undefined`)
  })

  it("empty string", () => {
    // ## Arrange ##
    const src = ``
    // ## Act ##
    const result = convertToObject(src)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`undefined`)
  })

  it("no swagger string", () => {
    // ## Arrange ##
    const src = `any string literal`
    // ## Act ##
    const result = convertToObject(src)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`undefined`)
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
      {
        "consumes": [
          "application/json",
        ],
        "info": {
          "title": "Simple API overview",
        },
        "paths": {
          "/": {
            "get": {
              "operationId": "listVersionsv2",
              "produces": [
                "application/json",
              ],
              "responses": {
                "200": {
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
      {
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
        "unexpected end of the stream within a flow collection (6:1)

         3 |   \\"a\\": \\"a\\",
         4 |   \\"b\\": 2,
         5 |   \\"cc\\": null,
         6 | 
        -----^"
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
        "missed comma between flow collection entries (4:3)

         1 | 
         2 | {
         3 |   \\"a\\": \\"a\\"
         4 |   \\"b\\": 2,
        -------^
         5 |   \\"cc\\": null,
         6 | }"
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
        "bad indentation of a mapping entry (7:21)

         4 |                 title: Simple API overview
         5 | paths:
         6 |   /:
         7 |     get: operationId: listVersionsv2
        -------------------------^
         8 |       produces:
         9 |       - application/json"
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
        "bad indentation of a mapping entry (9:7)

          6 |   /:
          7 |     get:
          8 |               operationId: listVersionsv2
          9 |       produces:
        ------------^
         10 | application/json
         11 |       responses:"
      `)
    })
  })
})
