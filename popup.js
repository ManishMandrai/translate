
document.getElementById("translate-button").addEventListener("click", async () => {
    const targetLang = document.getElementById("language-select").value;

    let[tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab.url.startsWith('chrome://')) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        }, () => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func:(lang) =>{
                    translateMessagesInContentScript(lang);
                },
                args:[targetLang]
            });
        });
    }else{
        console.error("Can't Access Chrome:// URL.")
    }
});