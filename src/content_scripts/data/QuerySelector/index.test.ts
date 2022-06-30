import { querySelector, querySelectorAll, querySelectorStrict } from "."
import { createMockDocumentBy } from "../../__tests__/Helper"
import * as Document from "./Document"
import { testHtml } from "./index.test.data"

describe("Basic test", () => {
  /**
   * @see https://facebook.github.io/jest/docs/en/mock-functions.html#mock-return-values
   */
  beforeAll(() => {
    // ## Arrange ##
    vi.mock("./Document", (): typeof Document => {
      return {
        getDocument: () => {
          return createMockDocumentBy(testHtml)
        },
      }
    })
  })

  describe("querySelectorAll", () => {
    it("要素がない", () => {
      // ## Arrange ##
      // ## Act ##
      const elements = querySelectorAll("not found query")
      // ## Assert ##
      expect(elements).toStrictEqual([])
    })

    it("要素が1つある", () => {
      // ## Arrange ##
      // ## Act ##
      const elements = querySelectorAll("#test-id-unique")
      // ## Assert ##
      expect(elements.length).toStrictEqual(1)
    })

    it("要素が2つ以上ある", () => {
      // ## Arrange ##
      // ## Act ##
      const elements = querySelectorAll(".test-class-name-used-a-lot")
      // ## Assert ##
      expect(elements.length).toStrictEqual(3)
    })
  })

  describe("querySelector", () => {
    it("要素がない", () => {
      // ## Arrange ##
      // ## Act ##
      const element = querySelector("not found query")
      // ## Assert ##
      expect(element).toStrictEqual(undefined)
    })

    it("要素が1つある", () => {
      // ## Arrange ##
      // ## Act ##
      const element = querySelector("#test-id-unique")
      // ## Assert ##
      expect(element).toMatchInlineSnapshot(`
        <p
          id="test-id-unique"
        >
          
              This domain is established to be used for illustrative examples in documents.
              You may use this domain in examples without prior coordination or asking for permission.
            
        </p>
      `)
    })

    it("要素が2つ以上ある", () => {
      // ## Arrange ##
      // ## Act ##
      // ## Assert ##
      expect(() => {
        querySelector(".test-class-name-used-a-lot")
      }).toThrow()
    })
  })

  describe("querySelectorStrict", () => {
    it("要素がない", () => {
      // ## Arrange ##
      // ## Act ##
      // ## Assert ##
      expect(() => {
        querySelectorStrict("not found query")
      }).toThrow()
    })

    it("要素が1つある", () => {
      // ## Arrange ##
      // ## Act ##
      const element = querySelectorStrict("#test-id-unique")
      // ## Assert ##
      expect(element).toBeDefined()
    })

    it("要素が2つ以上ある", () => {
      // ## Arrange ##
      // ## Act ##
      // ## Assert ##
      expect(() => {
        querySelectorStrict(".test-class-name-used-a-lot")
      }).toThrow()
    })
  })
})
