import { extractSrc, getElmOfSrcCode, isConverted } from "."
import { createMockDocumentBy } from "../../__tests__/Helper"
import * as Document from "../QuerySelector/Document"
import { html as swagger20YamlHtml_InPrivateBrowsing } from "./fixtures/GitHubPageHtml_swagger_2_0_yaml_InPrivateBrowsing"

/**
 * Use 1 mock per file because it is not possible to reset the mocks in the same file.
 */
/**
 * プライベートブラウザ（シークレットモード） + organizationアカウント？では少し違ったDOMが表示されるため、別途テスト
 */
describe("GitHubPageHtml swagger 2.0 yaml tests in Private browsing", () => {
  beforeAll(() => {
    // ## Arrange ##
    vi.mock("../QuerySelector/Document", (): typeof Document => {
      return {
        getDocument: () => {
          return createMockDocumentBy(
            // No login
            swagger20YamlHtml_InPrivateBrowsing,
            "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__tests__/fixtures/swagger_2_0.yaml"
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
