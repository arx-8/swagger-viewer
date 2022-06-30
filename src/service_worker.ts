import { MessagePayload } from "src/universal/types/App"

chrome.action.onClicked.addListener((tab) => {
  if (tab.id == null) {
    throw new Error(`Unexpected tab: ${JSON.stringify(tab)}`)
  }

  chrome.tabs.sendMessage<MessagePayload>(tab.id, {
    type: "CALL_CONVERT_SWAGGER",
  })
})
