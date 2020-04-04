/**
 * `npm test` が正しく動作することを確認するためのサンプル
 * UTの書き方のメモ代わり
 * @see https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#writing-tests
 */
describe("Example", () => {
  it("testable", () => {
    // ## Arrange ##
    const list: readonly number[] = [...[1, 2, 3, 4, 5]]

    // ## Act ##
    const result = list
      .filter((n) => n % 2 === 0)
      .map((n) => n * 2)
      .reduce((l, r) => l + r)

    // ## Assert ##
    expect(result).toStrictEqual(12)
  })
})

describe("toBe と toEqual の違いは、オブジェクトの比較", () => {
  class Human {
    constructor(private readonly name: string, private readonly age: number) {}

    public getGreet(): string {
      return `My name is ${this.name}. ${this.age} years old`
    }
  }

  it('toBe は "==="', () => {
    // Literal
    expect(2).not.toBe("2")
    expect(2).not.toBe(true)
    expect(0).not.toBe(false)
    expect(false).toBe(false)

    // Array
    expect([1, 2, 4]).not.toBe([1, 2, 4])
    expect([1, 2, 4]).not.toBe([1, 4, 2])

    // Object
    expect({ v1: 1, v2: 2 }).not.toBe({ v1: 1, v2: 2 })
    expect({ v1: 1, v2: 2 }).not.toBe({ v1: 1, v2: 2 })
    const objInstance = { v1: 1, v2: 2 }
    expect(objInstance).toBe(objInstance)

    // class
    expect(new Human("taro", 20)).not.toBe(new Human("taro", 20))
    const classInstance = new Human("taro", 20)
    expect(classInstance).toBe(classInstance)
  })

  it("toEqual は deepEqual", () => {
    /* eslint-disable jest/prefer-strict-equal */
    // Literal
    expect(2).not.toEqual("2")
    expect(2).not.toEqual(true)
    expect(0).not.toEqual(false)
    expect(false).toEqual(false)

    // Array
    expect([1, 2, 4]).toEqual([1, 2, 4])
    expect([1, 2, 4]).not.toEqual([1, 4, 2])

    // Object
    expect({ v1: 1, v2: 2 }).toEqual({ v1: 1, v2: 2 })
    expect({ v1: 1, v2: 2 }).toEqual({ v1: 1, v2: 2 })
    const objInstance = { v1: 1, v2: 2 }
    expect(objInstance).toEqual(objInstance)

    // class
    expect(new Human("taro", 20)).toEqual(new Human("taro", 20))
    const classInstance = new Human("taro", 20)
    expect(classInstance).toEqual(classInstance)
    /* eslint-enable */
  })

  /**
   * @see https://jestjs.io/docs/en/expect#tostrictequalvalue
   */
  describe("さらに toStrictEqual の方が厳格である", () => {
    class LaCroix {
      flavor: string

      constructor(flavor: string) {
        this.flavor = flavor
      }
    }

    it("are not semantically the same", () => {
      /* eslint-disable jest/prefer-strict-equal */
      expect(new LaCroix("lemon")).toEqual({ flavor: "lemon" })
      expect(new LaCroix("lemon")).not.toStrictEqual({ flavor: "lemon" })
      /* eslint-enable */
    })
  })
})
