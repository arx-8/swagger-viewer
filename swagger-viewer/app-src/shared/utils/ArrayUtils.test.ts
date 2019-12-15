import { range, zip } from "./ArrayUtils"

describe("range", () => {
  it("できる", () => {
    // ## Arrange ##
    // ## Act ##
    const result = range(4, 10)
    // ## Assert ##
    expect(result).toStrictEqual([4, 5, 6, 7, 8, 9])
  })

  it("同値", () => {
    // ## Arrange ##
    // ## Act ##
    const result = range(11, 11)
    // ## Assert ##
    expect(result).toStrictEqual([])
  })

  it("to < fromな引数はダメ", () => {
    // ## Arrange ##
    // ## Act ##
    // ## Assert ##
    expect(() => {
      range(3, 2)
    }).toThrow()
  })
})

describe("zip", () => {
  it("できる", () => {
    // ## Arrange ##
    // ## Act ##
    const result = zip([3, 2, 1, 0], ["三", "二", "一", ""])
    // ## Assert ##
    expect(result).toStrictEqual([
      [3, "三"],
      [2, "二"],
      [1, "一"],
      [0, ""],
    ])
  })

  it("lengthが異なる引数はダメ", () => {
    // ## Arrange ##
    // ## Act ##
    // ## Assert ##
    expect(() => {
      zip([2, 1, 0], ["三", "二", "一", ""])
    }).toThrow()
  })
})
