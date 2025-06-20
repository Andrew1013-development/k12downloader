const no_document = document.getElementById("no_document");
const yes_document = document.getElementById("document");
const document_title = document.getElementById("document_title");
const document_date = document.getElementById("document_date");
const inject_option = document.getElementById("inject");
const refresh_button = document.getElementById("refresh");

// load document info
chrome.storage.local.get().then(result => {
    if (result.type == 1) {
        no_document.style.display = "none";
        yes_document.style.display = "block";
        chrome.storage.local.get(["document_name", "document_date"]).then(result => {
            document_title.innerText += result.document_name;
            document_date.innerText += result.document_date;
        });
    }
});

// load inject option
chrome.storage.sync.get("inject").then(result => {
    inject_option.checked = result.inject;
});
// update inject option
inject_option.addEventListener("change", () => {
    chrome.storage.sync.set({ inject: inject_option.checked });
    refresh_button.style.display = "block";
});
refresh_button.addEventListener("click", () => {
    refresh_button.style.display = "none";
    window.close();
    chrome.tabs.reload();
});