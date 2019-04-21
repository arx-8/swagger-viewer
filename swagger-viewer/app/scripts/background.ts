import { EXEC_CONVERT_SWAGGER } from "../../app-src/shared/constants/SendMessageTypes"
import { ExecConvertSwaggerMessage } from "../../app-src/shared/types/SendMessage"

// TIPS: background script の console.log の出力先は、「バックグラウンドページ」
chrome.browserAction.onClicked.addListener((tab) => {
  if (tab.id == null) {
    throw new Error(`Unexpected tab.id:${tab.id}`)
  }

  chrome.tabs.sendMessage(tab.id, ({
    type: EXEC_CONVERT_SWAGGER,
  } as any) as ExecConvertSwaggerMessage)
})
