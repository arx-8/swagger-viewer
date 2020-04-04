import { JSDOM } from "jsdom"

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
  return new JSDOM(html, {
    url,
  }).window.document
}
