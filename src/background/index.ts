console.log("background script running")
chrome.runtime.onMessage.addListener(
    function (request, _sender, sendResponse) {
        if (request.contentScriptQuery == "req") {
            fetch(request.url)
                .then(response => response.text())
                // .then(text => parsePrice(text))
                .then(price => sendResponse(price))
            return true;  // Will respond asynchronously.
        } else {
            return false
        }
    });
export default null