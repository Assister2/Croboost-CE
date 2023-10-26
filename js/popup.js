
$("#redirectSignupBtn").click(function(){
    $("#loginContainer").css("display","none");
    $("#signupContainer").css("display", "block");
})
$("#redirectLoginBtn").click(function(){
    $("#loginContainer").css("display","block");
    $("#signupContainer").css("display", "none");
})

$("#loginForm").click(function () {
    let email = $("#loginEmail").val();
    let password = $("#loginPassword").val();
    if (!validateEmail(email)) {
        $("#loginEmail").css("borderColor", "red");
    }
    if (password.length < 8) {
        $("#loginPassword").css("borderColor", "red");
    }
    
    if (email && validateEmail(email) && password.length >= 8) {
        chrome.runtime.sendMessage({message: 'login', payload: {email, password}}, response => {
            if (response.access_token) {
                chrome.storage.local.set({
                    'email': email,
                    'access_token': response.access_token,
                    'refresh_token': response.refresh_token,
                })
                $("#loginDetails").html("Successfully Loggedin");
                $("#loginDetails").css("color", "green");
            }else{
                $("#loginDetails").html(response.detail);
                $("#loginDetails").css("color", "red");
            }
        })
    }
});

$("#signupForm").click( function () {
    let email = $("#signupEmail").val();
    let password = $("#signupPassword").val();
    let confirmPassword = $("#confirmPassword").val();

    if (!validateEmail(email)) {
        $("#signupEmail").style.borderColor = "red";
    }
    if (password.length < 8) {
        $("#signupPassword").style.borderColor = "red";
    }

    if (confirmPassword.length < 8) {
        $("#confirmPassword").style.borderColor = "red";
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