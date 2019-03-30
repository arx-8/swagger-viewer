chrome.tabs.onUpdated.addListener((tabId) => {
  chrome.tabs.sendMessage(tabId, {
    method: "chrome.tabs.onUpdated",
  })
})
