chrome.storage.sync.get("inject").then(result => {
    if (result.inject === undefined) {
        chrome.storage.sync.set({ inject: true });
    }
});