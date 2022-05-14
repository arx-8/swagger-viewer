import { extractSrc, getElmOfSrcCode, isConverted } from "."
import { createMockDocumentBy } from "../../__test__/Helper"
import * as Document from "../QuerySelector/Document"
import { html as swagger20JsonHtml } from "./fixtures/GitHubPageHtml_swagger_2_0_json"

/**
 * Use 1 mock per file because it is not possible to reset the mocks in the same file.
 */
describe("GitHubPageHtml swagger 2.0 json tests", () => {
  beforeAll(() => {
    // ## Arrange ##
    vi.mock("../QuerySelector/Document", (): typeof Document => {
      return {
        getDocument: () => {
          return createMockDocumentBy(
            // No login
            swagger20JsonHtml,
            "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__test__/fixtures/swagger_2_0.json"
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
      // ## Act ##
      const result = getElmOfSrcCode()
      // ## Assert ##
      expect(result.textContent != null).toStrictEqual(true)
      expect(result.children.length).toStrictEqual(1)
    })

    it("extractSrc", () => {
      // ## Assert ##
      expect(extractSrc()).toMatchSnapshot()
    })
  })
})
