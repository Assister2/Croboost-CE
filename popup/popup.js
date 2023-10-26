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
    
    if (email && validateEmail(email) && password.length >= 8) {
        chrome.runtime.sendMessage({message: 'login', payload: {email, password}}, response => {
            console.log(response);
            if (response) {
                chrome.storage.local.set({
                    'email': email,
                    'access_token': response.access_token,
                    'refresh_token': response.refresh_token,
                })
            }
        })
    }
});

document.getElementById("signupForm").addEventListener("submit", function () {
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (!validateEmail(email)) {
        document.getElementById("signupEmail").style.borderColor = "red";
    }
    if (password.length < 8) {
        document.getElementById("signupPassword").style.borderColor = "red";
    }

    if (confirmPassword.length < 8) {
        document.getElementById("confirmPassword").style.borderColor = "red";
    }

    if (email && validateEmail(email) && password.length >= 8 && password === confirmPassword) {
        chrome.runtime.sendMessage({message: 'signup', payload: {email, password}}, response => {
            console.log(response);
        })
    }
});

function validateEmail (email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}