import * as Document from "src/content_scripts/data/QuerySelector/Document"
import { createMockDocumentBy } from "src/content_scripts/__tests__/Helper"
import { extractSrc, getElmOfSrcCode, isConverted } from "."

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
        '"Unexpected DOM. Probably GitHub has been updated. Please contact the developer or wait until the extension is fixed. selector1: \\"#repo-content-turbo-frame div.Box-body table.swagger-viewer--original_src_area\\", selector2: \\"#repo-content-pjax-container div.Box-body table.swagger-viewer--original_src_area, selector3: \\"#repo-content-pjax-container section[aria-labelledby=\\"file-name-id\\"].swagger-viewer--original_src_area\\""'
      )
    })

    it("extractSrc", () => {
      // ## Assert ##
      expect(() => {
        extractSrc()
      }).toThrowErrorMatchingInlineSnapshot(
        '"Unexpected DOM. Probably GitHub has been updated. Please contact the developer or wait until the extension is fixed. selector1: \\"#repo-content-turbo-frame div.Box-body table.swagger-viewer--original_src_area\\", selector2: \\"#repo-content-pjax-container div.Box-body table.swagger-viewer--original_src_area, selector3: \\"#repo-content-pjax-container section[aria-labelledby=\\"file-name-id\\"].swagger-viewer--original_src_area\\""'
      )
    })
  })
})
