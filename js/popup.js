$(document).ready(function (){
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
                    });
                    $("#loginDetails").html("Successfully Loggedin");
                    $("#loginDetails").css("color", "green");
                    chrome.runtime.sendMessage({message: 'tests', payload: {"token":response.access_token}}, response => {
                        if(response){
                            $("#loginContainer").css("display", "none");
                            response.forEach((element, index) => {
                                let str = `<div class="card m-1" style="width: 18rem;">
                                    <div class="card-body">
                                    <h5 class="card-title">`+element.title+`</h5>
                                    <button class="btn btn-primary view-btn-`+index+`" data-record="`+element.record_id+`">View Data</button>
                                    <br>
                                    <span class="error-view-`+index+`"</span>
                                    </div>
                                </div>`
                                $(".test-container").append(str);
                                $(".view-btn-"+index).click(function(){
                                    var record_id = $(this).attr("data-record");
                                    chrome.storage.local.get("access_token").then((access_token) =>{
                                        chrome.runtime.sendMessage({message: 'view', payload: {record_id, access_token}}, response => {
                                            if(response.detail){
                                                $(".error-view-"+index).html(response.detail);
                                                $(".error-view-"+index).css("color","red");
                                            }else{
                                                $(".view-container").css("display","block");
                                                $(".test-container").css("display","none");
                                                console.log(JSON.parse(response.data));
                                                var conversionSet = getData(JSON.parse(response.data), "conversion");
                                                const conversion = $("#conversion");
                                                new Chart(conversion, {
                                                    type: 'bar',
                                                    data: conversionSet,
                                                    options: {
                                                        indexAxis: 'y', // <-- here
                                                        responsive: true
                                                    }
                                                });

                                                var eventSet = getData(JSON.parse(response.data), "event");
                                                const event = $("#event");
                                                new Chart(event, {
                                                    type: 'bar',
                                                    data: eventSet,
                                                    options: {
                                                        indexAxis: 'y', // <-- here
                                                        responsive: true
                                                    }
                                                });

                                                var bounceSet = getData(JSON.parse(response.data), "bounce");
                                                const bounce = $("#bounce");
                                                new Chart(bounce, {
                                                    type: 'bar',
                                                    data: bounceSet,
                                                    options: {
                                                        indexAxis: 'y', // <-- here
                                                        responsive: true
                                                    }
                                                });

                                                var sessionSet = getData(JSON.parse(response.data), "session");
                                                const session = $("#session");
                                                new Chart(session, {
                                                    type: 'bar',
                                                    data: sessionSet,
                                                    options: {
                                                        indexAxis: 'y', // <-- here
                                                        responsive: true
                                                    }
                                                });
                                            }
                                        })
                                    });
                                    
                                    
                                })
                            });
                        }
                    })
                }else{
                    $("#loginDetails").html(response.detail);
                    $("#loginDetails").css("color", "red");
                }
            })
        }
    });

    $(".back-test").click(function (){
        $(".test-container").css("display","block");
        $(".view-container").css("display","none");
    })

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
})

function getData(res, type){
    var datasets = [];
    var title = "";
    res.forEach(el => {
        const color = Math.floor(Math.random()*16777215).toString(16);
        const bgcolor = Math.floor(Math.random()*16777215).toString(16);
        var data = {label: el.Variant, borderColor: "#"+bgcolor, backgroundColor: "#"+color}
        switch(type){
            case  "conversion":
                data.data = [el.Average_Conversion_Rate.slice(0, -1)];
                break;
            case "event":
                data.data = [el.Average_Event_Count];
                break;
            case "bounce":
                data.data = [el.Bounce_Rate.slice(0, -1)];
                break;
            case "session":
                data.data = [el.Average_Session_Duration];
                break;
        }
        datasets.push(data);

    });
    switch(type){
       case  "conversion":
            title = "Conversion Rate %";
            break;
        case "event":
            title = "Avg. Event count";
            break;
        case "bounce":
            title = "Bounce Rate %";
            break;
        case "session":
            title = "Session Duration";
            break;
    }
   
    if(type=="bounce"){
        title = "Bounce Rate %";
    }

    return {labels: [title], datasets:datasets}
}
function validateEmail (email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}