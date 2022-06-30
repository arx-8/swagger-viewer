import { extractSrc, getElmOfSrcCode, isConverted } from "."
import { createMockDocumentBy } from "../../__tests__/Helper"
import * as Document from "../QuerySelector/Document"
import { html as swagger30YamlHtml } from "./fixtures/GitHubPageHtml_swagger_3_0_yaml"

/**
 * Use 1 mock per file because it is not possible to reset the mocks in the same file.
 */
describe("GitHubPageHtml swagger 3.1 yaml tests", () => {
  beforeAll(() => {
    // ## Arrange ##
    vi.mock("../QuerySelector/Document", (): typeof Document => {
      return {
        getDocument: () => {
          return createMockDocumentBy(
            // logged in + dark mode
            swagger30YamlHtml,
            "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__tests__/fixtures/swagger_3_1.yaml"
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