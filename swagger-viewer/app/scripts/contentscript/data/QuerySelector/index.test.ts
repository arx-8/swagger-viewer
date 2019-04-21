import * as DocumentRepository from "."
import { createMockDocumentBy } from "../../__test__/Helper"
import { testHtml } from "./index.test.data"

describe("Basic test", () => {
  let sut: typeof DocumentRepository

  /**
   * @see https://facebook.github.io/jest/docs/en/mock-functions.html#mock-return-values
   */
  beforeAll(() => {
    // ## Arrange ##
    jest.mock("./Document")
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const mockDocument = require("./Document")

    mockDocument.getDocument.mockReturnValue(createMockDocumentBy(testHtml))

    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    sut = require(".")
  })

  describe("querySelector", () => {
    it("要素がない", () => {
      // ## Arrange ##
      // ## Act ##
      const element = sut.querySelector("not found query")
      // ## Assert ##
      expect(element).toBeNull()
    })
    it("要素が1つある", () => {
      // ## Arrange ##
      // ## Act ##
      const element = sut.querySelector("#test-id-unique")
      // ## Assert ##
      expect(element).toBeDefined()
    })
    it("要素が2つ以上ある", () => {
      // ## Arrange ##
      // ## Act ##
      // ## Assert ##
      expect(() => {
        sut.querySelector(".test-class-name-used-a-lot")
      }).toThrow()
    })
  })

  describe("querySelectorStrict", () => {
    it("要素がない", () => {
      // ## Arrange ##
      // ## Act ##
      // ## Assert ##
      expect(() => {
        sut.querySelectorStrict("not found query")
      }).toThrow()
    })
    it("要素が1つある", () => {
      // ## Arrange ##
      // ## Act ##
      const element = sut.querySelectorStrict("#test-id-unique")
      // ## Assert ##
      expect(element).toBeDefined()
    })
    it("要素が2つ以上ある", () => {
      // ## Arrange ##
      // ## Act ##
      // ## Assert ##
      expect(() => {
        sut.querySelectorStrict(".test-class-name-used-a-lot")
      }).toThrow()
    })
  })
})
