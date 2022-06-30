import { EXEC_CONVERT_SWAGGER } from "./universal/constants/SendMessageTypes"
import { ExecConvertSwaggerMessage } from "./universal/types/SendMessage"
import { CastAny } from "./universal/types/utils"

chrome.action.onClicked.addListener((tab) => {
  if (tab.id == null) {
    throw new Error(`Unexpected tab: ${JSON.stringify(tab)}`)
  }

  chrome.tabs.sendMessage(tab.id, {
    type: EXEC_CONVERT_SWAGGER,
  } as CastAny as ExecConvertSwaggerMessage)
})
