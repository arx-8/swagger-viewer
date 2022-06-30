import { getDocument } from "src/content_scripts/data/QuerySelector/Document"
import { FixMeAny } from "src/universal/types/utils"

/**
 * document.querySelectorAll() をモック可能にするためのラッパー
 */
export const querySelectorAll = (
  selector: string
): ReadonlyArray<HTMLElement> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Array.prototype.slice.call(getDocument().querySelectorAll(selector))
}
/**
 * 1要素をgetする
 *
 * @throws 2要素以上見つかった
 */
export const querySelector = (selector: string): HTMLElement | undefined => {
  const founds = querySelectorAll(selector)
  if (founds.length === 0) {
    return undefined
  }
  if (founds.length === 1) {
    return founds[0]
  }
  throw new Error(`Logic Failure: "${selector}" found multiple elements`)
}

/**
 * 必ず1要素をgetする
 *
 * @throws 見つからない | 2要素以上見つかった
 */
export const querySelectorStrict = <T extends HTMLElement>(
  selector: string
): T => {
  const founds = querySelectorAll(selector)
  if (founds.length === 1) {
    // なぜか型が合わないため無視
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return founds[0] as FixMeAny
  }
  throw new Error(`Logic Failure: "${selector}" is always 1 element exists`)
}
