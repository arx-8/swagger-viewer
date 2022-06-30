import { extractSrc, getElmOfSrcCode, isConverted } from "."
import { createMockDocumentBy } from "../../__tests__/Helper"
import * as Document from "../QuerySelector/Document"

/**
 * Use 1 mock per file because it is not possible to reset the mocks in the same file.
 */
describe("empty page", () => {
  beforeAll(() => {
    // ## Arrange ##
    vi.mock("../QuerySelector/Document", (): typeof Document => {
      return {
        getDocument: () => {
          return createMockDocumentBy(
            `<!DOCTYPE html><html lang="en"><head><title>empty</title></head><body></body></html>`,
            "https://example.com"
          )
        },
      }
    })
  })

  describe("whole tests", () => {
    it("isConverted", () => {
      // ## Assert ##
      expect(isConverted()).toStrictEqual(false)
    })

    it("getElmOfSrcCode", () => {
      // ## Assert ##
      expect(() => {
        getElmOfSrcCode()
      }).toThrowErrorMatchingInlineSnapshot(
        `"Unexpected DOM. Probably GitHub has been updated. Please contact the developer or wait until the extension is fixed. selector: \\"#repo-content-pjax-container div.Box-body table\\""`
      )
    })

    it("extractSrc", () => {
      // ## Assert ##
      expect(() => {
        extractSrc()
      }).toThrowErrorMatchingInlineSnapshot(
        `"Unexpected DOM. Probably GitHub has been updated. Please contact the developer or wait until the extension is fixed. selector: \\"#repo-content-pjax-container div.Box-body table\\""`
      )
    })
  })
})
