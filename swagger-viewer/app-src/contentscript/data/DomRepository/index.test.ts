import * as DomRepository from "."
import { CastAny } from "../../../shared/types/utils"
import { createMockDocumentBy } from "../../__test__/Helper"
import * as Document from "../QuerySelector/Document"
import { html as swagger20JsonHtml } from "./fixtures/GitHubPageHtml_swagger_2_0_json"
import { html as swagger20YamlHtml_InPrivateBrowsing } from "./fixtures/GitHubPageHtml_swagger_2_0_yaml_InPrivateBrowsing"
import { html as swagger30YamlHtml } from "./fixtures/GitHubPageHtml_swagger_3_0_yaml"

/**
 * 注意: DomRepository に直接アクセスすると、Mockが無効になってしまう。
 * DomRepository を直接使うテストは、別ファイルにする必要がある。
 */

describe("GitHubPageHtml swagger 2.0 json tests", () => {
  let sut: typeof DomRepository
  // let mockDocument: jest.MockInstance<typeof Document>
  let mockDocument: typeof Document

  beforeAll(() => {
    // ## Arrange ##
    jest.mock("../QuerySelector/Document")

    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    mockDocument = require("../QuerySelector/Document")
    // mock化しているため、mockReturnValueは必ず存在する
    // 型の書き方が不明なため、any castしている
    ;(mockDocument as CastAny).getDocument.mockReturnValue(
      createMockDocumentBy(
        // No login
        swagger20JsonHtml,
        "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__test__/fixtures/swagger_2_0.json"
      )
    )

    // eslint-disable-next-line global-require
    sut = require(".")
  })

  describe("whole tests", () => {
    it("isConverted", () => {
      // ## Assert ##
      expect(sut.isConverted()).toStrictEqual(false)
    })

    it("getElmOfSrcCode", () => {
      // ## Act ##
      const result = sut.getElmOfSrcCode()
      // ## Assert ##
      expect(result.textContent != null).toStrictEqual(true)
      expect(result.children.length).toStrictEqual(1)
    })

    it("extractSrc", () => {
      // ## Assert ##
      expect(sut.extractSrc()).toMatchSnapshot()
    })
  })
})

/**
 * プライベートブラウザ（シークレットモード） + organizationアカウント？では少し違ったDOMが表示されるため、別途テスト
 */
describe("GitHubPageHtml swagger 2.0 yaml tests in Private browsing", () => {
  let sut: typeof DomRepository
  // let mockDocument: jest.MockInstance<typeof Document>
  let mockDocument: typeof Document

  beforeAll(() => {
    // ## Arrange ##
    jest.mock("../QuerySelector/Document")

    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    mockDocument = require("../QuerySelector/Document")
    // mock化しているため、mockReturnValueは必ず存在する
    // 型の書き方が不明なため、any castしている
    ;(mockDocument as CastAny).getDocument.mockReturnValue(
      createMockDocumentBy(
        // No login
        swagger20YamlHtml_InPrivateBrowsing,
        "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__test__/fixtures/swagger_2_0.yaml"
      )
    )

    // eslint-disable-next-line global-require
    sut = require(".")
  })

  describe("whole tests", () => {
    it("isConverted", () => {
      // ## Assert ##
      expect(sut.isConverted()).toStrictEqual(false)
    })

    it("getElmOfSrcCode", () => {
      // ## Act ##
      const result = sut.getElmOfSrcCode()
      // ## Assert ##
      expect(result.textContent != null).toStrictEqual(true)
      expect(result.children.length).toStrictEqual(1)
    })

    it("extractSrc", () => {
      // ## Assert ##
      expect(sut.extractSrc()).toMatchSnapshot()
    })
  })
})

describe("GitHubPageHtml swagger 3.0 yaml tests", () => {
  let sut: typeof DomRepository
  // let mockDocument: jest.MockInstance<typeof Document>
  let mockDocument: typeof Document

  beforeAll(() => {
    // ## Arrange ##
    jest.mock("../QuerySelector/Document")

    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    mockDocument = require("../QuerySelector/Document")
    // mock化しているため、mockReturnValueは必ず存在する
    // 型の書き方が不明なため、any castしている
    ;(mockDocument as CastAny).getDocument.mockReturnValue(
      createMockDocumentBy(
        // logged in + dark mode
        swagger30YamlHtml,
        "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__test__/fixtures/swagger_3_0.yaml"
      )
    )

    // eslint-disable-next-line global-require
    sut = require(".")
  })

  describe("whole tests", () => {
    it("isConverted", () => {
      // ## Assert ##
      expect(sut.isConverted()).toStrictEqual(false)
    })

    it("getElmOfSrcCode", () => {
      // ## Act ##
      const result = sut.getElmOfSrcCode()
      // ## Assert ##
      expect(result.textContent != null).toStrictEqual(true)
      expect(result.children.length).toStrictEqual(1)
    })

    it("extractSrc", () => {
      // ## Assert ##
      expect(sut.extractSrc()).toMatchSnapshot()
    })
  })
})

describe("empty page", () => {
  let sut: typeof DomRepository
  // let mockDocument: jest.MockInstance<typeof Document>
  let mockDocument: typeof Document

  beforeAll(() => {
    // ## Arrange ##
    jest.mock("../QuerySelector/Document")

    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    mockDocument = require("../QuerySelector/Document")
    // mock化しているため、mockReturnValueは必ず存在する
    // 型の書き方が不明なため、any castしている
    ;(mockDocument as CastAny).getDocument.mockReturnValue(
      createMockDocumentBy(
        `<!DOCTYPE html><html lang="en"><head><title>empty</title></head><body></body></html>`,
        "https://example.com"
      )
    )

    // eslint-disable-next-line global-require
    sut = require(".")
  })

  describe("whole tests", () => {
    it("isConverted", () => {
      // ## Assert ##
      expect(sut.isConverted()).toStrictEqual(false)
    })

    it("getElmOfSrcCode", () => {
      // ## Assert ##
      expect(() => {
        sut.getElmOfSrcCode()
      }).toThrowErrorMatchingInlineSnapshot(
        `"Unexpected DOM. selector: \\"#repo-content-pjax-container div.Box > div.Box-body > table\\""`
      )
    })

    it("extractSrc", () => {
      // ## Assert ##
      expect(() => {
        sut.extractSrc()
      }).toThrowErrorMatchingInlineSnapshot(
        `"Unexpected DOM. selector: \\"#repo-content-pjax-container div.Box > div.Box-body > table\\""`
      )
    })
  })
})
