// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "openInFreedium",
        title: "Open in Freedium",
        contexts: ["link", "page"]
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openInFreedium") {
        chrome.storage.sync.get(['freediumUrl'], (result) => {
            if (!result.freediumUrl) {
                // Alert user if proxy URL is not set
                chrome.tabs.create({
                    url: chrome.runtime.getURL('options.html')
                });
                return;
            }

            // Get the URL to proxy
            const urlToProxy = info.linkUrl || info.pageUrl;

            // Create the proxied URL
            const proxiedUrl = `${result.freediumUrl}/${encodeURIComponent(urlToProxy)}`;

            // Open in new tab
            chrome.tabs.create({
                url: proxiedUrl
            });
        });
    }
});