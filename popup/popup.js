const no_document = document.getElementById("no_document");
const yes_document = document.getElementById("document");
const document_title = document.getElementById("document_title");
const document_date = document.getElementById("document_date");

chrome.storage.local.get().then(result => {
    if (result.type == 1) {
        no_document.style.display = "none";
        yes_document.style.display = "block";
        chrome.storage.local.get(["document_name", "document_date"]).then(result => {
            document_title.innerText = `${chrome.i18n.getMessage("document_title_text")}: ${result.document_name}`;
            document_date.innerText += `${chrome.i18n.getMessage("document_date_text")}: ${result.document_date}`;
        });
    }
});