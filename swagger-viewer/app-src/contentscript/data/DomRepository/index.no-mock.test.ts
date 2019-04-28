import { isAcceptableLocation } from "."

describe("isAcceptableLocation", () => {
  /**
   * テストに使える必要最小限のMock Documentオブジェクトを返す
   */
  const createMockDocument = (hrefUrl: string): Document => {
    return {
      location: {
        href: hrefUrl,
      },
    } as any
  }

  describe("Acceptable cases (yaml/yml)", () => {
    it("normal", () => {
      expect(
        isAcceptableLocation(
          createMockDocument(
            "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__test__/fixtures/swagger_3_0.yaml",
          ),
        ),
      ).toEqual(true)
    })
    it("line link (1-9)", () => {
      expect(
        isAcceptableLocation(
          createMockDocument("https://github.com/some/any.yml#L5"),
        ),
      ).toEqual(true)
    })
    it("line link (> 9)", () => {
      expect(
        isAcceptableLocation(
          createMockDocument("https://github.com/some/any.yaml#L9999"),
        ),
      ).toEqual(true)
    })
    it("range link (1-9)", () => {
      expect(
        isAcceptableLocation(
          createMockDocument("https://github.com/some/any.yaml#L2-L3"),
        ),
      ).toEqual(true)
    })
    it("range link (> 9)", () => {
      expect(
        isAcceptableLocation(
          createMockDocument("https://github.com/some/any.yml#L9999-L10000"),
        ),
      ).toEqual(true)
    })
  })

  describe("Acceptable cases (json)", () => {
    it("normal", () => {
      expect(
        isAcceptableLocation(
          createMockDocument(
            "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__test__/fixtures/swagger_3_0.json",
          ),
        ),
      ).toEqual(true)
    })
    it("line link (> 9)", () => {
      expect(
        isAcceptableLocation(
          createMockDocument("https://github.com/some/any.json#L9999"),
        ),
      ).toEqual(true)
    })
    it("range link (> 9)", () => {
      expect(
        isAcceptableLocation(
          createMockDocument("https://github.com/some/any.json#L9-L10"),
        ),
      ).toEqual(true)
    })
  })

  describe("Not acceptable cases", () => {
    it("no yaml", () => {
      expect(
        isAcceptableLocation(
          createMockDocument(
            "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__test__/fixtures/swagger_3_0.yam",
          ),
        ),
      ).toEqual(false)
    })
    it("no json", () => {
      expect(
        isAcceptableLocation(
          createMockDocument(
            "https://github.com/arx-8/swagger-viewer/blob/master/swagger-viewer/app-src/shared/__test__/fixtures/swagger_3_0.js",
          ),
        ),
      ).toEqual(false)
    })
    it("no GitHub", () => {
      expect(
        isAcceptableLocation(
          createMockDocument(
            "https://gitlab.com/gitlab-com/sales-team/field-operations/channel/blob/master/swagger.yaml",
          ),
        ),
      ).toEqual(false)
    })
  })
})
