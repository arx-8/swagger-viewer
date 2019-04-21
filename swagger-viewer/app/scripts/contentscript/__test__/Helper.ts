import { JSDOM } from "jsdom"

/**
 * # 注意
 * 実DOMをMockにする場合に気をつけること
 *
 * - html内の個人情報をうっかりコミットしないこと（マスク or 丸ごと削除）
 *   - 名前（和名、ローマ字）
 *   - 社・部・課名
 *   - 勤務体系
 *   - mail domain
 * - 「\」（円記号）を「\\」にエスケープすること
 *
 * @param html <html>をトップレベルにしたhtml文字列
 */
export const createMockDocumentBy = (html: string): Document => {
  return new JSDOM(html).window.document
}
