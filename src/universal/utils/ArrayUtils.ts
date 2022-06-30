import { CastAny } from "src/universal/types/utils"

/**
 * alternative implementation of lodash because it is too heavy
 */

export const range = (from: number, to: number): readonly number[] => {
  if (to < from) {
    throw new Error("Universal error: Illegal arg")
  }
  const ret = []
  for (let index = from; index < to; index += 1) {
    ret.push(index)
  }
  return ret
}

export const zip = <T1, T2>(
  ary1: T1[],
  ary2: T2[]
): ReadonlyArray<readonly [T1, T2]> => {
  if (ary1.length !== ary2.length) {
    throw new Error("Universal error: Illegal arg. Should same length.")
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return ary1.map((e1, index) => [e1, ary2[index]]) as CastAny
}
