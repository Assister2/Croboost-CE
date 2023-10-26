
$("#redirectSignupBtn").click(function(){
    $("#loginContainer").css("display","none");
    $("#signupContainer").css("display", "block");
})
$("#redirectLoginBtn").click(function(){
    $("#loginContainer").css("display","block");
    $("#signupContainer").css("display", "none");
})

$("#loginBtn").click(function () {
    let email = $("#loginEmail").val();
    let password = $("#loginPassword").val();
    if (!validateEmail(email)) {
        $(".mail-error").css("display","block");
        $(".mail-error").html("Invalid email");
        $(".mail-error").css("color","red");
    }else{
        $(".mail-error").css("display","none");
    }
    if (password.length < 8) {
        $(".password-error").css("display","block");
        $(".password-error").html("Password length should be 8");
        $(".password-error").css("color","red");
    }else{
        $(".password-error").css("display","none");
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

$("#signupBtn").click( function () {
    let email = $("#signupEmail").val();
    let password = $("#signupPassword").val();
    let confirmPassword = $("#confirmPassword").val();

    if (!validateEmail(email)) {
        $(".email-error").css("display","block");
        $(".email-error").html("Invalid email");
        $(".email-error").css("color","red");
    }else{
        $(".email-error").css("display","none");
    }
    if (password.length < 8) {
        $(".pwd-error").css("display","block");
        $(".pwd-error").html("Password length should be 8");
        $(".pwd-error").css("color","red");
    }else{
        $(".pwd-error").css("display","none");
    }

    if (confirmPassword != password) {
        $(".cfm-error").css("display","block");
        $(".cfm-error").html("Password not match");
        $(".cfm-error").css("color","red");
    }else{
        $(".cfm-error").css("display","none");
    }

    if (email && validateEmail(email) && password.length >= 8 && password === confirmPassword) {
        chrome.runtime.sendMessage({message: 'signup', payload: {email, password}}, response => {
            if(response.status == "OK"){
                $("#signupDetails").html("Successfully SignUp");
                $("#signupDetails").css("color","green");
            }
            if(response.detail){
                $("#signupDetails").html(response.detail);
                $("#signupDetails").css("color","red");
            }
        })
    }
});

function validateEmail (email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}