function convert_date(date_string) {
    return date_string.substring(6,8) + "/" + date_string.substring(4,6) + "/" + date_string.substring(0,4);
}
function parse(document_link) {
    components = document_link.split("/");
    return { name: components[6], date: convert_date(components[5]) };
}

const lesson_title = document.querySelector("div.panel-title");
const material = document.querySelector("div.content-coursewarePdf");
// download course material
if (material) {
    chrome.storage.local.set({ type: 1 });
    let document_info = parse(material.getAttribute("data-file"));
    chrome.storage.local.set({ document_name: document_info.name });
    chrome.storage.local.set({ document_date: document_info.date });
    const action_button = document.querySelector(".action-btn");
    let download_button = `<a class="btn btn-default margin-left-2xs learning-comment-btn btn-secondary text-medium" href=${material.getAttribute("data-file")} target="_blank">
        <i class="vi vi-download"></i>
        <span>Tải tài liệu</span>
    </a>`
    action_button.insertAdjacentHTML("beforebegin", download_button);
}
// download course text
const text = null;
if (text) {
    chrome.storage.local.set({ type: 2})
}

window.addEventListener("beforeunload", () => {
    try {
        chrome.storage.local.clear();
        chrome.storage.local.set({ type: 0 });
    } catch (error) {
        console.log(error);
    }
})