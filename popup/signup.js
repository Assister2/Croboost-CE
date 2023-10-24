function redirectLogin() {
    chrome.browserAction.setPopup({popup: "./login.html"});
}

document.getElementById("loginBtn").addEventListener("click", redirectLogin);