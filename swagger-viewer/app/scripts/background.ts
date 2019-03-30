import { EXEC_CONVERT_SWAGGER } from "./SendMessageKey"

// TIPS: background script の console.log の出力先は、「バックグラウンドページ」
chrome.browserAction.onClicked.addListener((tab) => {
  if (tab.id == null) {
    throw new Error("Unexpected tab.id:" + tab.id)
  }

  chrome.tabs.sendMessage(tab.id, {
    method: EXEC_CONVERT_SWAGGER,
  })
})
