import { EXEC_CONVERT_SWAGGER } from "./constants/SendMessageTypes"
import { ExecConvertSwaggerMessage } from "./types/SendMessage"

// TIPS: background script の console.log の出力先は、「バックグラウンドページ」
chrome.browserAction.onClicked.addListener((tab) => {
  if (tab.id == null) {
    throw new Error("Unexpected tab.id:" + tab.id)
  }

  chrome.tabs.sendMessage(tab.id, {
    type: EXEC_CONVERT_SWAGGER,
  } as ExecConvertSwaggerMessage)
})
