document.getElementById("redirectSignupBtn").addEventListener("click", function () {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("signupContainer").style.display = "block";
});

document.getElementById("redirectLoginBtn").addEventListener("click", function () {
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("signupContainer").style.display = "none";
});

document.getElementById("loginForm").addEventListener("submit", function () {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    if (!validateEmail(email)) {
        document.getElementById("loginEmail").style.borderColor = "red";
    }
    if (password.length < 8) {
        document.getElementById("loginPassword").style.borderColor = "red";
    }
    alert("here");
    alert(email && validateEmail(email) && password.length >= 8);
    if (email && validateEmail(email) && password.length >= 8) {
        chrome.runtime.sendMessage({message: 'login', payload: {email, password}}, function (response) {
            alert(response);
        })
    }
});

function validateEmail (email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}