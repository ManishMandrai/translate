chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ targetLang: "es" })
})