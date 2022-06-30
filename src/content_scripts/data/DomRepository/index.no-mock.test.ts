import { isAcceptableLocation } from "."
import { CastAny } from "../../../universal/types/utils"

describe("isAcceptableLocation", () => {
  /**
   * テストに使える必要最小限のMock Documentオブジェクトを返す
   */
  const createMockDocument = (hrefUrl: string): Document => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      location: {
        href: hrefUrl,
      },
    } as CastAny
  }

  describe("Acceptable cases (yaml/yml)", () => {
    it("normal", () => {
      expect(
        isAcceptableLocation(
          createMockDocument(
            "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__tests__/fixtures/swagger_3_0.yaml"
          )
        )
      ).toStrictEqual(true)
    })
    it("line link (1-9)", () => {
      expect(
        isAcceptableLocation(
          createMockDocument("https://github.com/some/any.yml#L5")
        )
      ).toStrictEqual(true)
    })
    it("line link (> 9)", () => {
      expect(
        isAcceptableLocation(
          createMockDocument("https://github.com/some/any.yaml#L9999")
        )
      ).toStrictEqual(true)
    })
    it("range link (1-9)", () => {
      expect(
        isAcceptableLocation(
          createMockDocument("https://github.com/some/any.yaml#L2-L3")
        )
      ).toStrictEqual(true)
    })
    it("range link (> 9)", () => {
      expect(
        isAcceptableLocation(
          createMockDocument("https://github.com/some/any.yml#L9999-L10000")
        )
      ).toStrictEqual(true)
    })
  })

  describe("Acceptable cases (json)", () => {
    it("normal", () => {
      expect(
        isAcceptableLocation(
          createMockDocument(
            "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__tests__/fixtures/swagger_3_0.json"
          )
        )
      ).toStrictEqual(true)
    })
    it("line link (> 9)", () => {
      expect(
        isAcceptableLocation(
          createMockDocument("https://github.com/some/any.json#L9999")
        )
      ).toStrictEqual(true)
    })
    it("range link (> 9)", () => {
      expect(
        isAcceptableLocation(
          createMockDocument("https://github.com/some/any.json#L9-L10")
        )
      ).toStrictEqual(true)
    })
  })

  describe("Not acceptable cases", () => {
    it("no yaml", () => {
      expect(
        isAcceptableLocation(
          createMockDocument(
            "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__tests__/fixtures/swagger_3_0.yam"
          )
        )
      ).toStrictEqual(false)
    })
    it("no json", () => {
      expect(
        isAcceptableLocation(
          createMockDocument(
            "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__tests__/fixtures/swagger_3_0.js"
          )
        )
      ).toStrictEqual(false)
    })
    it("no GitHub", () => {
      expect(
        isAcceptableLocation(
          createMockDocument(
            "https://gitlab.com/gitlab-com/sales-team/field-operations/channel/blob/master/swagger.yaml"
          )
        )
      ).toStrictEqual(false)
    })
  })
})
