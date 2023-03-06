import { JSDOM } from "jsdom"
import { ORIGINAL_SRC_AREA_CLASS } from "src/universal/types/App"

/**
 * # 注意
 * 実DOMをMockにする場合に気をつけること
 *
 * - html内の個人情報をコミットしないこと（マスク or 丸ごと削除）
 *   - 名前（和名、ローマ字）
 *   - 社名
 *   - 勤務体系
 *   - mail domain
 *     - etc...
 * - 「\」（円記号）を「\\」にエスケープすること
 *
 * @param html <html>をトップレベルにしたhtml文字列
 * @param url sets the value returned by window.location, document.URL, and document.documentURI, and affects things like resolution of relative URLs within the document and the same-origin restrictions and referrer used while fetching subresources. It defaults to "about:blank".
 */
export const createMockDocumentBy = (
  html: string,
  url = "about:blank"
): Document => {
  const dom = new JSDOM(html, {
    url,
  }).window.document

  // emulate injectApp()
  // src is scattered all over the place, and it's not good...
  {
    const elm1 = dom.querySelector(
      `#repo-content-turbo-frame div.Box-body table`
    )
    elm1?.classList.add(ORIGINAL_SRC_AREA_CLASS)
  }
  // fallback
  {
    const elm2 = dom.querySelector(
      `#repo-content-pjax-container div.Box-body table`
    )
    elm2?.classList.add(ORIGINAL_SRC_AREA_CLASS)
  }
  // fallback for the new code view (2023)
  {
    const elm3 = dom.querySelector(
      `#repo-content-turbo-frame section[aria-labelledby="file-name-id"]`
    )
    elm3?.classList.add(ORIGINAL_SRC_AREA_CLASS)
  }

  return dom
}
