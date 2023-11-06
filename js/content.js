// localStorage.setItem("toggle", false);

// // Global variable

let currentTabId = "tabA";
let currentTextAreaAStr = "";
let currentTextAreaBStar = "";
let currentAIDescription = "";

$(document).ready(function (){
    var content = `
        <div class="container extension-container p-2">
            <div class="container loginContainer p-2" id="loginContainer">
                <h2 class="text-center loginTitle" id="loginTitle">Login</h2>
                <strong id="loginDetails"></strong>
                <br>
                <form class="loginForm" id="loginForm">
                    <div class="input-group">
                        <input type="text" id="loginEmail" class="input"  placeholder="Email" required>
                        <span class="mail-error"></span>
                    </div>
                    <br>
                    <div class="input-group">
                        <input type="password" id="loginPassword" class="input"  required placeholder="At least 8 characters">
                        <span class="password-error"></span>
                    </div>
                    <br>
                    <button class="btn btn-primary" id="loginBtn" type="button">Login</button>
                    <button class="btn btn-default" type="button" id="redirectSignupBtn">Signup</button>
                </form>
            </div>
            <div class="container signupContainer" id="signupContainer" style="display: none">
                <h2 class="text-center signupTitle" id="signupTitle">Signup</h2>
                <strong id="signupDetails"></strong>
                <br>
                <form class="signupForm" id="signupForm">
                    <div class="input-group">
                        <input type="text" id="signupEmail" class="input" placeholder="Email">
                        <span class="email-error"></span>
                    </div>
                    <br>
                    <div class="input-group">
                        <input type="password" id="signupPassword" class="input" placeholder="password">
                        <span class="pwd-error"></span>
                    </div>
                    <br>
                    <div class="input-group">
                        <input type="password" id="confirmPassword" class="input" placeholder="confirm password">
                        <span class="cfm-error"></span>
                    </div>
                    <br>
                    <button class="btn btn-primary" type="button" id="signupBtn">Signup</button>
                    <button class="btn btn-default" type="button" id="redirectLoginBtn">Login</button>
                </form>
            </div>
            <div class="container test-container" style="display:none;">
                <button class="btn btn-primary back-create">Back</button>
            </div>
            <div class="container view-container" style="display: none;">
                <button class="btn btn-primary back-test">Back</button>
                <br>
                <canvas id="conversion"></canvas>
                <canvas id="event"></canvas>
                <canvas id="bounce"></canvas>
                <canvas id="session"></canvas>
            </div>
            <div class="umix-final-container p-2" style="display:none">
                <div class="umix-total-container">
                    <div class="umix-toolbar-container">
                        <img src="chrome-extension://kfimhnomfhbfkfifkbgnenilfnojmipj/images/logo.svg" alt="logo" class="umix-logo">
                        <div class="umix-toolbar-button-group">
                            <button type="button" class="umix-toolbar-btn plus-btn">
                            <span class="btn-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </g>
                                </svg>
                            </span>
                            </button>
                            <button type="button" class="umix-toolbar-btn cursor-btn"><span class="btn-icon"><img src="chrome-extension://kfimhnomfhbfkfifkbgnenilfnojmipj/images/ai-icon.svg" class="umix-ai-icon" alt="ai-icon"></span></button>
                            <button type="button" class="umix-toolbar-btn">
                            <span class="btn-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            </button>
                        </div>
                    </div>
                    <div class="umix-ai-container p-2">
                        <div class="umix-content-title umix-ai-title">AI Editor</div>
                        <select name="select-ai-field" id="select-ai-field" class="umix-select">
                            <option value="css" name="css">css</option>
                            <option value="javascript" name="javascript">javascript</option>
                        </select>
                        <textarea placeholder="Describe your design" id="ai-description" rows="3" cols="35" class="umix-textarea umix-ai-description"></textarea>
                        <button class="umix-create-btn umix-ai-generate-btn">Generate</button>
                    </div>
                    <div class="umix-content-container">
                        <div class="umix-content-title">Create Test</div>
                        <div class="umix-input-label">Test Name</div>
                        <input type="text" id="name" name="title" placeholder="Test Name" class="umix-input-title">
                        <div class="umix-tab">
                            <button class="umix-tab-links active">Variant A</button><button class="umix-tab-links">Variant B</button>
                            <div class="umix-tab-content" id="tabA">
                            <select name="select-tabA" id="select-tabA" class="umix-select">
                                <option value="css" name="css">css</option>
                                <option value="javascript" name="javascript">javascript</option>
                            </select>
                            <textarea id="cssA" rows="6" cols="35" class="umix-textarea"></textarea>
                            </div>
                            <div class="umix-tab-content" id="tabB">
                            <select name="select-tabB" id="select-tabB" class="umix-select">
                                <option value="css" name="css">css</option>
                                <option value="javascript" name="javascript">javascript</option>
                            </select>
                            <textarea id="cssA" rows="6" cols="35" class="umix-textarea"></textarea>
                            </div>
                        </div>
                        <div class="umix-button-group"><button class="umix-create-btn umix-ai-create-btn">Create A/B Test</button></div>
                        <button class="umix-flying-btn">
                            <span class="btn-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </g>
                            </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>`
    $("body").append(content);
    chrome.storage.local.get("access_token").then((result) =>{
        if(result){
            $(".loginContainer").css("display", "none");
            $(".umix-final-container").css("display", "block")
        }
    });
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
                    
                    $(".umix-final-container").css("display","block");
                    $("#loginContainer").css("display", "none");
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
    $(".back-create").click(function (){
        $(".test-container").css("display","none");
        $(".umix-content-container").css("display","block");
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

    $(".umix-flying-btn").click(function (event) {
        if (currentTabId === "tabA") {
            openTab(event, "tabB", 2);
        } else {
            openTab(event, "tabA", 1)
        }
    });

    $(".plus-btn").click(function (){
        
        $(".umix-content-container").css("display","block");
        $(".umix-ai-container").css("display","none");
    })
    $(".cursor-btn").click(function (event) {
        $(".umix-content-container").css("display","none");
        $(".umix-ai-container").css("display","block");
    });
    
    $(".umix-ai-generate-btn").click(function () {
        let currentSelectAIOption = $("#select-ai-field").val();
        currentAIDescription = $("#ai-description").val();
        let html = currentTabId === "tabA" ? currentTextAreaAStr : currentTextAreaBStar;
        if (currentSelectAIOption && currentAIDescription) {
            chrome.runtime.sendMessage({message: 'getAi', payload: {
                "data":JSON.stringify({
                    "html": html,
                    "description": currentAIDescription,
                }), aiOption : currentSelectAIOption
            }}, response => {
                if (response.output.output) {
                    if (currentTabId === "tabA") {
                        $(".umix-textarea").val(response.output.output);
                        appendCSS(response.output.output);
                    } else {
                        textAreaB.value = response.output.output;
                        textAreaB.dispatchEvent(new Event('input'));
                    }
                }
            })
        }
    });
    
    $(".umix-ai-create-btn").click(function () {
        var inputTitle = $(".umix-input-title").val();
        currentTextAreaAStr = $(".umix-textarea").val();
        if (inputTitle && currentTextAreaAStr) {
            chrome.storage.local.get("access_token").then((temp) =>{
                chrome.runtime.sendMessage({message: 'createTest', payload: {
                    token: temp, 
                    data: {
                        title: inputTitle.value,
                        data: currentTextAreaAStr,
                        is_live: false
                    }
                }
            }, response => {
                alert(JSON.stringify(response));
                chrome.runtime.sendMessage({message: 'tests', payload: {"token":temp.access_token}}, response => {
                    if(response){
                        $(".umix-content-container").css("display", "none");
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
                            $(".test-container").css("display","block");
                            $(".view-btn-"+index).click(function(){
                                var record_id = $(this).attr("data-record");
                                chrome.runtime.sendMessage({message: 'view', payload: {record_id, temp}}, response => {
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
                                
                            })
                        });
                    }
                });
                }
            )})
        }
    });
    
})
const appendCSS = s => document.head.appendChild(document.createElement("style")).innerHTML = s;
const appendScript = s => document.head.appendChild(document.createElement("script")).innerHTML = s;

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

function openTab(event, target, flag) {
    currentTabId = target
    // Get all elements with class="tabcontent" and hide them
    let tabContents = $(".umix-tab-content");
    for (i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    let tabLinks = $(".umix-tab-links");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(target).style.display = "block";
    if (flag === 2) {
        tabLinks[1].className += " active";
    } else if (flag === 1) {
        tabLinks[0].className += " active";
    } else
        event.currentTarget.className += " active";
}

// window.onload = function () {
//     import(chrome.runtime.getURL("js-confetti.min.js")).then((module) => {
//         document.jsConfetti = new module.default();
//     });
// };

// // Global variable
// let currentTabId = "tabA";
// let currentTextAreaAStr = "";
// let currentTextAreaBStar = "";
// let currentAIDescription = "";

// // Create a button element
// const button = document.createElement("button");
// const img = document.createElement("img");
// img.src = `data:image/png;base64,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AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMI7AAAUQngHAIBCCO8AAFAI4R0AAAohvAMAQCGEdwAAKITwDgAAhRDeAQCgEMdEeAcAgCII7wAAUAjhHQAACiG8AwBAIYR3AAAohPAOAACFEN4BAKAQwjsAABRCeAcAgEII7wAAUAjhHQAACiG8AwBAIYR3AAAohPAOAACFEN4BAKAQwjsAABRCeAcAgEII7wAAUAjhHQAACiG8AwBAIYR3AAAohPAOAACFEN4BAKAQwjsAABRCeAcAgEII7wAAUAjhHQAACiG8AwBAIYR3AAAohPAOAACFEN4BAKAQwjsAABRCeAcAgEII7wAAUAjhHQAACiG8AwBAIYR3AAAohPAOAACFEN4BAKAQwjsAABRCeAcAgEII7wAAUIjjkvwovUP0rX3+vY3w/qwmJw0AACUaFN4vSnJ4kp/1+bnwDgAALRoU3j+WZK/F113Y5zXCOwAAtGTQnvdPZDm8J8mr+7zOnncAAGjBsJX3Pde8/uAkd/V5vZV3AABo0Dgr7yv9lz7XWHkHAICGjLvyvtI9k1zf51or7wAAULONrryv9JhUgdvKOwAANGiSlfe1tqWe/fBW3gEAoIc6w/uSJyW5sU+fwjsAAGxQHdtm+tma5KwkO/r0b9sMAACMoYmV916OSnJmkn9OsrPPeFbeAQBggLbC+1r3SrK9z7jCOwAA9NBVeE+Sv+4zrvAOAAA9NLnnfZg39RnXnncAAOhBeAcAgEII7wAAUAjhHQAACiG8AwBAIYR3AAAohPAOAACFEN4BAKAQR6a7hzS9uc+4HtIEAAA97Jvkilh5BwCAIrw3Vt4BAKAID02yK+tD9NeS7NPguFbeAQBgAz6e9SH6riRHNzimlXcAANiAeyfZmfVB+t0Njim8AwDABr0kvcP0Uxoaz7YZAACYwDvTO1Dv18BYVt4BAGBC52d9oP55A+MI7wAAUIN/TO8vsG6ucQzhHQAAavKZ9A7X962pf+EdAABq9A/pHbBPq6Fv4R0AAGr2hvQO2Vdmsm00wjsAADTgIekdtCdZhRfeAQCgIZuSXJv+gfukMft6y4C+hHcAAKjBaem/Cv+LJL+dKpwPckCSc/r0IbwDAECNdk/y3fQP8Qupjpv8jSQHrrn2mCT/MckNfa4T3gEAoAGPThW2B4X4hSQ7k/wwybeS3DzktcI7AAA06MUZHuBHbXckeXa75QMAwPw5LcmdmSy8X5/k5LYLBwCAeXVSkuuysfD+5SRHtl8yAADMt72TvCb9v5y6tn0zyfMz2cOfAACKNOy4PmjTHkkem+TpSU5IckiqIyNvSPVl1i8n+WiSf0oV5AEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADsRjlQAAAC/SURBVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJhf/w/HiQkpljkO6wAAAABJRU5ErkJggg==`;
// img.alt = "Image Button";
// img.style.position = "fixed";
// img.style.bottom = "10px";
// img.style.right = "10px";
// img.style.zIndex = "9999"; // Ensure the button is on top of other page elements
// img.style.width = "150px";
// img.style.height = "150px";

// button.appendChild(img);

// const umixFinalContainer = document.createElement('div');
// umixFinalContainer.className = "umix-final-container";

// const umixAIContainer = document.createElement('div');
// umixAIContainer.className = "umix-ai-container";

// const aiTitle = document.createElement('div');
// aiTitle.className = "umix-content-title umix-ai-title";
// aiTitle.innerText = "AI Editor";

// const selectAIField = document.createElement("select");
// selectAIField.setAttribute("name", "select-ai-field");
// selectAIField.setAttribute("id", "select-ai-field");
// selectAIField.className = "umix-select";

// const optionCss = document.createElement("option");
// optionCss.setAttribute("value", "css");
// optionCss.setAttribute("name", "css");
// optionCss.innerText = "css";
// const optionJs = document.createElement("option");
// optionJs.setAttribute("value", "javascript");
// optionJs.setAttribute("name", "javascript");
// optionJs.innerText = "javascript";

// selectAIField.appendChild(optionCss);
// selectAIField.appendChild(optionJs);

// const aiDescription = document.createElement('textarea');
// aiDescription.placeholder = "Describe your design";
// aiDescription.setAttribute("id", "ai-description");
// aiDescription.setAttribute("rows", 3);
// aiDescription.setAttribute("cols", 35);
// aiDescription.className = "umix-textarea umix-ai-description";

// const generateAIBtn = document.createElement('button');
// generateAIBtn.className = "umix-create-btn umix-ai-generate-btn";
// generateAIBtn.innerText = "Generate";

// umixAIContainer.appendChild(aiTitle);
// umixAIContainer.appendChild(selectAIField);
// umixAIContainer.appendChild(aiDescription);
// umixAIContainer.appendChild(generateAIBtn);

// const umixTotalContainer = document.createElement('div');
// umixTotalContainer.className = "umix-total-container";

// // Top right toolbar container
// const toolbarContainer = document.createElement('div');
// toolbarContainer.className = "umix-toolbar-container";

// const logoImg = document.createElement("img");
// logoImg.src = chrome.runtime.getURL("images/logo.svg");
// logoImg.alt = "logo";
// logoImg.className = "umix-logo";

// const toolbarBtnGroup = document.createElement("div");
// toolbarBtnGroup.className = "umix-toolbar-button-group";

// const plusBtn = document.createElement("button");
// plusBtn.setAttribute("type", "button");
// plusBtn.className = "umix-toolbar-btn";
// const plusBtnText = `<span class="btn-icon">
//         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
//     </span>`;
// plusBtn.innerHTML = plusBtnText;

// const aiBtn = document.createElement("button");
// aiBtn.setAttribute("type", "button");
// aiBtn.className = "umix-toolbar-btn";
// const aiIcon = document.createElement("img");
// aiIcon.src = chrome.runtime.getURL("images/ai-icon.svg");
// aiIcon.className = "umix-ai-icon";
// aiIcon.alt = "ai-icon";
// const aiBtnText = document.createElement("span");
// aiBtnText.className = "btn-icon";
// aiBtnText.appendChild(aiIcon);
// aiBtn.appendChild(aiBtnText);

// const settingBtn = document.createElement("button");
// settingBtn.setAttribute("type", "button");
// settingBtn.className = "umix-toolbar-btn";
// const settingBtnText = `<span class="btn-icon">
//         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.1361 3.36144L14.6337 3.31169L14.1361 3.36144ZM13.9838 2.54161L13.5394 2.7708V2.77081L13.9838 2.54161ZM14.4311 4.81793L14.8286 4.51467V4.51467L14.4311 4.81793ZM15.3595 5.20248L15.2928 4.70694L15.2928 4.70694L15.3595 5.20248ZM16.5979 4.38113L16.9145 4.76811V4.76811L16.5979 4.38113ZM17.2853 3.90918L17.4375 4.38547L17.2853 3.90918ZM17.9872 3.94419L18.186 3.48541V3.48541L17.9872 3.94419ZM18.6243 4.4822L18.2707 4.83575V4.83575L18.6243 4.4822ZM19.5178 5.37567L19.8713 5.02211V5.02211L19.5178 5.37567ZM20.0558 6.01275L20.5146 5.81396L20.5146 5.81396L20.0558 6.01275ZM20.0908 6.71464L20.5671 6.8668L20.5671 6.86679L20.0908 6.71464ZM19.6188 7.4021L19.2318 7.08548V7.08548L19.6188 7.4021ZM18.7975 8.64056L18.3019 8.5739V8.5739L18.7975 8.64056ZM19.182 9.56893L18.8787 9.96645L19.182 9.56893ZM20.6385 9.86385L20.6883 9.36633L20.6385 9.86385ZM21.4584 10.0162L21.6876 9.57187L21.6876 9.57187L21.4584 10.0162ZM21.9299 10.5373L22.3949 10.3534V10.3534L21.9299 10.5373ZM21.93 13.4626L21.465 13.2788L21.465 13.2788L21.93 13.4626ZM21.4583 13.9838L21.6875 14.4282H21.6875L21.4583 13.9838ZM20.6386 14.1361L20.5889 13.6386L20.5726 13.6402L20.5564 13.6429L20.6386 14.1361ZM20.6386 14.1361L20.6884 14.6337L20.7047 14.632L20.7208 14.6293L20.6386 14.1361ZM19.1825 14.4309L18.8794 14.0333L19.1825 14.4309ZM18.7979 15.3596L18.3023 15.4264V15.4264L18.7979 15.3596ZM19.619 16.5976L19.232 16.9142L19.619 16.5976ZM20.0908 17.2848L19.6145 17.437L19.6145 17.437L20.0908 17.2848ZM20.0558 17.9869L19.597 17.7881L19.597 17.7881L20.0558 17.9869ZM19.5179 18.6238L19.8715 18.9773L19.5179 18.6238ZM18.6243 19.5174L18.2708 19.1638V19.1638L18.6243 19.5174ZM17.9873 20.0554L18.1861 20.5141L18.1861 20.5141L17.9873 20.0554ZM17.2854 20.0904L17.1332 20.5667H17.1332L17.2854 20.0904ZM16.5979 19.6184L16.9146 19.2314L16.9103 19.228L16.5979 19.6184ZM16.5979 19.6184L16.2813 20.0054L16.2856 20.0088L16.5979 19.6184ZM15.3595 18.7971L15.4262 18.3015H15.4262L15.3595 18.7971ZM14.4311 19.1816L14.8286 19.4849L14.8286 19.4849L14.4311 19.1816ZM14.1362 20.6383L13.6386 20.5886L14.1362 20.6383ZM13.9837 21.4585L13.5394 21.2292L13.5394 21.2292L13.9837 21.4585ZM13.4628 21.9299L13.2789 21.465H13.2789L13.4628 21.9299ZM10.5373 21.9299L10.7211 21.465H10.7211L10.5373 21.9299ZM10.0162 21.4584L10.4606 21.2292L10.0162 21.4584ZM9.86385 20.6385L9.36634 20.6883L9.86385 20.6385ZM9.56892 19.182L9.17139 19.4853L9.17139 19.4853L9.56892 19.182ZM8.64057 18.7975L8.57392 18.3019H8.57392L8.64057 18.7975ZM7.40208 19.6189L7.08546 19.2319L7.07754 19.2384L7.06989 19.2452L7.40208 19.6189ZM7.40206 19.6189L7.71868 20.0058L7.7266 19.9994L7.73424 19.9926L7.40206 19.6189ZM6.71458 20.0908L6.86673 20.5671H6.86673L6.71458 20.0908ZM6.01272 20.0558L5.81394 20.5146H5.81394L6.01272 20.0558ZM5.37561 19.5178L5.72916 19.1642H5.72916L5.37561 19.5178ZM4.48217 18.6243L4.12861 18.9779H4.12861L4.48217 18.6243ZM3.94414 17.9873L4.40292 17.7885L3.94414 17.9873ZM3.90913 17.2854L4.38542 17.4375L3.90913 17.2854ZM4.3811 16.5979L4.76808 16.9145L4.3811 16.5979ZM5.20247 15.3594L5.69801 15.4261L5.20247 15.3594ZM4.81792 14.4311L5.12119 14.0335H5.12119L4.81792 14.4311ZM3.36143 14.1361L3.31168 14.6337H3.31168L3.36143 14.1361ZM2.54161 13.9838L2.77081 13.5394H2.77081L2.54161 13.9838ZM2.07005 13.4627L1.60507 13.6465H1.60507L2.07005 13.4627ZM2.07008 10.5372L1.60513 10.3533L1.60513 10.3533L2.07008 10.5372ZM2.54152 10.0163L2.31229 9.57193L2.31228 9.57193L2.54152 10.0163ZM3.36155 9.86384V9.36384H3.33661L3.3118 9.36633L3.36155 9.86384ZM3.36156 9.86384V10.3638H3.3865L3.41131 10.3614L3.36156 9.86384ZM4.81842 9.56881L4.5151 9.17132L4.51509 9.17132L4.81842 9.56881ZM5.20287 8.64066L5.69841 8.57408H5.69841L5.20287 8.64066ZM4.38128 7.40182L4.76826 7.0852L4.38128 7.40182ZM3.90914 6.71405L4.38545 6.56197H4.38544L3.90914 6.71405ZM3.94413 6.01243L3.48532 5.81371L3.48532 5.81371L3.94413 6.01243ZM4.48233 5.37509L4.83589 5.72864L4.83589 5.72864L4.48233 5.37509ZM5.37565 4.48177L5.0221 4.12822H5.0221L5.37565 4.48177ZM6.01277 3.94373L5.81398 3.48494H5.81398L6.01277 3.94373ZM6.71463 3.90872L6.86677 3.43243L6.71463 3.90872ZM7.4022 4.38076L7.71882 3.99378V3.99378L7.4022 4.38076ZM8.64044 5.20207L8.70718 4.70654L8.64044 5.20207ZM9.56907 4.81742L9.17149 4.51422L9.56907 4.81742ZM9.86387 3.36131L10.3614 3.41106V3.41106L9.86387 3.36131ZM10.0162 2.5417L9.57179 2.31255L9.57179 2.31256L10.0162 2.5417ZM10.5374 2.07001L10.7212 2.535L10.7212 2.535L10.5374 2.07001ZM13.4627 2.07005L13.6465 1.60507L13.6465 1.60507L13.4627 2.07005ZM14.6337 3.31169C14.6126 3.10146 14.5947 2.91945 14.5695 2.7696C14.5435 2.61482 14.5051 2.46166 14.4281 2.31242L13.5394 2.77081C13.5497 2.79088 13.5658 2.8308 13.5833 2.93519C13.6017 3.04449 13.6163 3.18775 13.6386 3.41119L14.6337 3.31169ZM14.8286 4.51467C14.8173 4.49983 14.7806 4.43872 14.7421 4.22451C14.7044 4.01507 14.6755 3.73051 14.6337 3.31169L13.6386 3.41119C13.6788 3.81323 13.7116 4.14432 13.7579 4.40161C13.8033 4.65413 13.8731 4.91083 14.0335 5.12119L14.8286 4.51467ZM15.2928 4.70694C15.1148 4.73089 14.9375 4.65749 14.8286 4.51467L14.0335 5.12118C14.3604 5.54967 14.892 5.76987 15.4261 5.69801L15.2928 4.70694ZM16.2813 3.99415C15.9555 4.26069 15.7339 4.44152 15.5592 4.56296C15.3804 4.68717 15.3113 4.70445 15.2928 4.70694L15.4261 5.69801C15.6883 5.66274 15.9192 5.53055 16.1298 5.38412C16.3445 5.23493 16.6018 5.02396 16.9145 4.76811L16.2813 3.99415ZM17.1332 3.4329C16.9732 3.484 16.8377 3.56512 16.7099 3.65619C16.5861 3.74436 16.4448 3.86037 16.2813 3.99415L16.9145 4.76811C17.0883 4.62591 17.1999 4.53493 17.2902 4.47062C17.3764 4.4092 17.416 4.39234 17.4375 4.38547L17.1332 3.4329ZM18.186 3.48541C17.853 3.3411 17.4789 3.32244 17.1332 3.4329L17.4375 4.38547C17.5527 4.34865 17.6774 4.35487 17.7884 4.40297L18.186 3.48541ZM18.9778 4.12865C18.8285 3.97925 18.6993 3.84975 18.5849 3.74971C18.4668 3.64638 18.3401 3.55217 18.186 3.48541L17.7884 4.40297C17.8092 4.41195 17.8469 4.43267 17.9265 4.50236C18.01 4.57534 18.112 4.67697 18.2707 4.83575L18.9778 4.12865ZM19.8713 5.02211L18.9778 4.12865L18.2707 4.83575L19.1642 5.72922L19.8713 5.02211ZM20.5146 5.81396C20.4478 5.65988 20.3536 5.53314 20.2503 5.41502C20.1502 5.30065 20.0207 5.17151 19.8713 5.02211L19.1642 5.72922C19.323 5.88801 19.4246 5.99001 19.4976 6.07343C19.5673 6.1531 19.588 6.19082 19.597 6.21155L20.5146 5.81396ZM20.5671 6.86679C20.6775 6.52106 20.6589 6.147 20.5146 5.81396L19.597 6.21154C19.6451 6.32255 19.6513 6.44724 19.6145 6.56249L20.5671 6.86679ZM20.0058 7.71872C20.1396 7.5552 20.2556 7.41382 20.3438 7.29006C20.4348 7.16224 20.516 7.02676 20.5671 6.8668L19.6145 6.56249C19.6076 6.58401 19.5908 6.62359 19.5293 6.7098C19.465 6.80008 19.374 6.91168 19.2318 7.08548L20.0058 7.71872ZM19.293 8.70721C19.2955 8.68872 19.3128 8.61958 19.437 8.44084C19.5584 8.2661 19.7393 8.0445 20.0058 7.71872L19.2318 7.08548C18.976 7.3982 18.765 7.65547 18.6158 7.87015C18.4694 8.08084 18.3372 8.31168 18.3019 8.5739L19.293 8.70721ZM19.4853 9.1714C19.3424 9.06244 19.2691 8.88524 19.293 8.70721L18.3019 8.5739C18.2301 9.108 18.4503 9.63959 18.8787 9.96645L19.4853 9.1714ZM20.6883 9.36633C20.2694 9.32445 19.9849 9.29562 19.7754 9.25793C19.5612 9.21938 19.5001 9.18271 19.4853 9.1714L18.8787 9.96645C19.0891 10.1269 19.3458 10.1967 19.5983 10.2421C19.8556 10.2884 20.1867 10.3212 20.5888 10.3614L20.6883 9.36633ZM21.6876 9.57187C21.5384 9.49489 21.3852 9.45645 21.2304 9.43046C21.0805 9.4053 20.8985 9.38736 20.6883 9.36633L20.5888 10.3614C20.8122 10.3837 20.9555 10.3983 21.0648 10.4167C21.1692 10.4342 21.2091 10.4503 21.2292 10.4606L21.6876 9.57187ZM22.3949 10.3534C22.2615 10.0159 22.0102 9.73825 21.6876 9.57187L21.2292 10.4606C21.3367 10.5161 21.4205 10.6086 21.465 10.7211L22.3949 10.3534ZM22.5 11.3682C22.5 11.157 22.5003 10.9741 22.4901 10.8224C22.4797 10.6658 22.4567 10.5096 22.3949 10.3534L21.465 10.7211C21.4733 10.7421 21.4853 10.7835 21.4924 10.8891C21.4997 10.9997 21.5 11.1437 21.5 11.3682H22.5ZM22.5 12.6319V11.3682H21.5V12.6319H22.5ZM22.395 13.6464C22.4567 13.4903 22.4797 13.3341 22.4901 13.1775C22.5003 13.026 22.5 12.8431 22.5 12.6319H21.5C21.5 12.8564 21.4997 13.0003 21.4924 13.1109C21.4853 13.2165 21.4733 13.2578 21.465 13.2788L22.395 13.6464ZM21.6875 14.4282C22.0101 14.2618 22.2615 13.984 22.395 13.6464L21.465 13.2788C21.4205 13.3914 21.3367 13.4839 21.2292 13.5394L21.6875 14.4282ZM20.6884 14.6337C20.8986 14.6126 21.0805 14.5947 21.2304 14.5695C21.3851 14.5436 21.5383 14.5051 21.6875 14.4282L21.2292 13.5394C21.2091 13.5498 21.1692 13.5658 21.0648 13.5833C20.9555 13.6017 20.8123 13.6163 20.5889 13.6386L20.6884 14.6337ZM20.7208 14.6293L20.7208 14.6293L20.5564 13.6429L20.5564 13.6429L20.7208 14.6293ZM19.4857 14.8285C19.5006 14.8172 19.5617 14.7805 19.7758 14.742C19.9852 14.7043 20.2697 14.6755 20.6884 14.6337L20.5889 13.6386C20.1869 13.6788 19.856 13.7115 19.5987 13.7578C19.3463 13.8032 19.0897 13.8729 18.8794 14.0333L19.4857 14.8285ZM19.2934 15.2929C19.2694 15.1148 19.3428 14.9375 19.4857 14.8285L18.8794 14.0333C18.4507 14.3602 18.2304 14.8921 18.3023 15.4264L19.2934 15.2929ZM20.006 16.281C19.7395 15.9553 19.5588 15.7338 19.4373 15.5591C19.3132 15.3805 19.2959 15.3113 19.2934 15.2929L18.3023 15.4264C18.3377 15.6885 18.4698 15.9192 18.6162 16.1298C18.7653 16.3444 18.9762 16.6016 19.232 16.9142L20.006 16.281ZM20.5671 17.1326C20.5159 16.9727 20.4348 16.8372 20.3438 16.7095C20.2557 16.5858 20.1397 16.4444 20.006 16.281L19.232 16.9142C19.3741 17.0879 19.4651 17.1995 19.5294 17.2897C19.5908 17.3759 19.6076 17.4155 19.6145 17.437L20.5671 17.1326ZM20.5145 18.1858C20.6589 17.8526 20.6776 17.4784 20.5671 17.1326L19.6145 17.437C19.6514 17.5523 19.6451 17.677 19.597 17.7881L20.5145 18.1858ZM19.8715 18.9773C20.0208 18.828 20.1503 18.6989 20.2503 18.5846C20.3536 18.4665 20.4478 18.3398 20.5145 18.1858L19.597 17.7881C19.588 17.8088 19.5673 17.8465 19.4976 17.9261C19.4247 18.0095 19.3231 18.1115 19.1644 18.2702L19.8715 18.9773ZM18.9779 19.8709L19.8715 18.9773L19.1644 18.2702L18.2708 19.1638L18.9779 19.8709ZM18.1861 20.5141C18.3401 20.4474 18.4669 20.3532 18.585 20.2498C18.6994 20.1498 18.8285 20.0203 18.9779 19.8709L18.2708 19.1638C18.112 19.3226 18.01 19.4242 17.9266 19.4972C17.8469 19.5669 17.8092 19.5876 17.7885 19.5966L18.1861 20.5141ZM17.1332 20.5667C17.4789 20.6771 17.853 20.6585 18.1861 20.5141L17.7885 19.5966C17.6775 19.6447 17.5528 19.6509 17.4375 19.6141L17.1332 20.5667ZM16.2813 20.0054C16.4448 20.1392 16.5862 20.2552 16.7099 20.3434C16.8378 20.4344 16.9732 20.5156 17.1332 20.5667L17.4375 19.6141C17.416 19.6072 17.3764 19.5904 17.2902 19.5289C17.1999 19.4646 17.0883 19.3736 16.9145 19.2314L16.2813 20.0054ZM16.2856 20.0088L16.2856 20.0089L16.9103 19.228L16.9103 19.228L16.2856 20.0088ZM15.2928 19.2926C15.3113 19.2951 15.3805 19.3124 15.5592 19.4366C15.7339 19.558 15.9555 19.7389 16.2813 20.0054L16.9145 19.2314C16.6018 18.9756 16.3446 18.7646 16.1299 18.6154C15.9192 18.469 15.6884 18.3368 15.4262 18.3015L15.2928 19.2926ZM14.8286 19.4849C14.9376 19.3421 15.1148 19.2687 15.2928 19.2926L15.4262 18.3015C14.892 18.2297 14.3604 18.4499 14.0336 18.8784L14.8286 19.4849ZM14.6337 20.6881C14.6756 20.2692 14.7044 19.9846 14.7421 19.7751C14.7807 19.5608 14.8173 19.4997 14.8286 19.4849L14.0336 18.8784C13.8731 19.0887 13.8033 19.3455 13.7579 19.598C13.7116 19.8553 13.6789 20.1865 13.6386 20.5886L14.6337 20.6881ZM14.4281 21.6877C14.5051 21.5385 14.5435 21.3852 14.5695 21.2304C14.5947 21.0805 14.6127 20.8984 14.6337 20.6881L13.6386 20.5886C13.6163 20.8121 13.6017 20.9554 13.5833 21.0648C13.5658 21.1692 13.5497 21.2092 13.5394 21.2292L14.4281 21.6877ZM13.6467 22.3949C13.9841 22.2614 14.2617 22.0102 14.4281 21.6877L13.5394 21.2292C13.4839 21.3367 13.3914 21.4205 13.2789 21.465L13.6467 22.3949ZM12.6316 22.5C12.843 22.5 13.0259 22.5003 13.1776 22.4901C13.3342 22.4797 13.4905 22.4566 13.6467 22.3949L13.2789 21.465C13.2579 21.4733 13.2166 21.4853 13.1109 21.4924C13.0003 21.4997 12.8563 21.5 12.6316 21.5V22.5ZM11.3682 22.5H12.6316V21.5H11.3682V22.5ZM10.3534 22.3949C10.5096 22.4567 10.6658 22.4797 10.8224 22.4901C10.9741 22.5003 11.157 22.5 11.3682 22.5V21.5C11.1437 21.5 10.9997 21.4997 10.8891 21.4924C10.7835 21.4853 10.7421 21.4733 10.7211 21.465L10.3534 22.3949ZM9.57187 21.6876C9.73824 22.0102 10.0159 22.2615 10.3534 22.3949L10.7211 21.465C10.6086 21.4205 10.5161 21.3367 10.4606 21.2292L9.57187 21.6876ZM9.36634 20.6883C9.38736 20.8985 9.4053 21.0805 9.43046 21.2304C9.45645 21.3852 9.49489 21.5384 9.57187 21.6876L10.4606 21.2292C10.4503 21.2091 10.4342 21.1692 10.4167 21.0648C10.3983 20.9555 10.3837 20.8122 10.3614 20.5888L9.36634 20.6883ZM9.17139 19.4853C9.18271 19.5001 9.21938 19.5612 9.25793 19.7754C9.29562 19.9849 9.32445 20.2695 9.36634 20.6883L10.3614 20.5888C10.3212 20.1867 10.2884 19.8556 10.2421 19.5983C10.1967 19.3458 10.1269 19.0891 9.96644 18.8787L9.17139 19.4853ZM8.70722 19.293C8.88525 19.2691 9.06244 19.3425 9.17139 19.4853L9.96644 18.8787C9.63958 18.4503 9.10801 18.2301 8.57392 18.3019L8.70722 19.293ZM7.71869 20.0058C8.04448 19.7393 8.26609 19.5584 8.44084 19.437C8.61958 19.3128 8.68872 19.2955 8.70722 19.293L8.57392 18.3019C8.3117 18.3372 8.08085 18.4694 7.87015 18.6158C7.65547 18.765 7.39819 18.976 7.08546 19.2319L7.71869 20.0058ZM7.73424 19.9926L7.73426 19.9926L7.06989 19.2452L7.06988 19.2452L7.73424 19.9926ZM6.86673 20.5671C7.0267 20.516 7.16218 20.4349 7.29001 20.3438C7.41377 20.2557 7.55516 20.1396 7.71868 20.0058L7.08544 19.2319C6.91164 19.3741 6.80003 19.4651 6.70976 19.5294C6.62354 19.5908 6.58395 19.6077 6.56244 19.6145L6.86673 20.5671ZM5.81394 20.5146C6.14696 20.6589 6.521 20.6776 6.86673 20.5671L6.56244 19.6145C6.44719 19.6514 6.32251 19.6451 6.21151 19.597L5.81394 20.5146ZM5.02205 19.8713C5.17146 20.0207 5.3006 20.1503 5.41497 20.2503C5.5331 20.3536 5.65985 20.4479 5.81394 20.5146L6.21151 19.597C6.19078 19.5881 6.15306 19.5673 6.07339 19.4977C5.98996 19.4247 5.88796 19.323 5.72916 19.1642L5.02205 19.8713ZM4.12861 18.9779L5.02205 19.8713L5.72916 19.1642L4.83572 18.2708L4.12861 18.9779ZM3.48535 18.186C3.55212 18.3401 3.64632 18.4669 3.74966 18.585C3.84971 18.6994 3.97922 18.8285 4.12861 18.9779L4.83572 18.2708C4.67693 18.112 4.57529 18.01 4.50232 17.9266C4.43262 17.8469 4.4119 17.8092 4.40292 17.7885L3.48535 18.186ZM3.43284 17.1332C3.3224 17.479 3.34106 17.853 3.48535 18.186L4.40292 17.7885C4.35482 17.6775 4.34861 17.5528 4.38542 17.4375L3.43284 17.1332ZM3.99413 16.2813C3.86033 16.4448 3.74432 16.5862 3.65614 16.7099C3.56507 16.8378 3.48395 16.9733 3.43284 17.1332L4.38542 17.4375C4.39229 17.416 4.40915 17.3764 4.47058 17.2902C4.53489 17.1999 4.62588 17.0883 4.76808 16.9145L3.99413 16.2813ZM4.70694 15.2928C4.70445 15.3113 4.68716 15.3804 4.56295 15.5592C4.4415 15.7339 4.26067 15.9555 3.99413 16.2813L4.76808 16.9145C5.02394 16.6018 5.23491 16.3445 5.38411 16.1298C5.53054 15.9192 5.66274 15.6883 5.69801 15.4261L4.70694 15.2928ZM4.51466 14.8286C4.65749 14.9375 4.73088 15.1147 4.70694 15.2928L5.69801 15.4261C5.76986 14.892 5.54966 14.3604 5.12119 14.0335L4.51466 14.8286ZM3.31168 14.6337C3.73051 14.6755 4.01507 14.7044 4.2245 14.7421C4.43871 14.7806 4.49983 14.8173 4.51466 14.8286L5.12119 14.0335C4.91083 13.8731 4.65413 13.8033 4.40161 13.7579C4.14432 13.7116 3.81322 13.6788 3.41118 13.6386L3.31168 14.6337ZM2.31242 14.4281C2.46166 14.5051 2.61482 14.5435 2.7696 14.5695C2.91945 14.5947 3.10145 14.6126 3.31168 14.6337L3.41118 13.6386C3.18774 13.6163 3.04449 13.6017 2.93519 13.5833C2.8308 13.5658 2.79088 13.5497 2.77081 13.5394L2.31242 14.4281ZM1.60507 13.6465C1.73852 13.9841 1.98984 14.2618 2.31242 14.4281L2.77081 13.5394C2.66328 13.4839 2.57951 13.3914 2.53502 13.2789L1.60507 13.6465ZM1.5 12.6318C1.5 12.8431 1.49974 13.0259 1.50987 13.1776C1.52033 13.3341 1.54333 13.4904 1.60507 13.6465L2.53502 13.2789C2.52672 13.2578 2.5147 13.2165 2.50764 13.1109C2.50026 13.0003 2.5 12.8563 2.5 12.6318H1.5ZM1.5 11.3683V12.6318H2.5V11.3683H1.5ZM1.60513 10.3533C1.54335 10.5095 1.52034 10.6658 1.50987 10.8224C1.49974 10.9741 1.5 11.157 1.5 11.3683H2.5C2.5 11.1437 2.50026 10.9997 2.50765 10.8891C2.51471 10.7834 2.52673 10.7421 2.53504 10.7211L1.60513 10.3533ZM2.31228 9.57193C1.98981 9.73829 1.73857 10.0159 1.60513 10.3533L2.53504 10.7211C2.57952 10.6086 2.66327 10.5161 2.77076 10.4606L2.31228 9.57193ZM3.3118 9.36633C3.10152 9.38735 2.91947 9.4053 2.76957 9.43047C2.61476 9.45647 2.46156 9.49492 2.31229 9.57193L2.77076 10.4606C2.79084 10.4503 2.83076 10.4342 2.93518 10.4167C3.04452 10.3983 3.1878 10.3837 3.4113 10.3614L3.3118 9.36633ZM3.36155 9.36384H3.36155V10.3638H3.36155V9.36384ZM3.36156 9.36384H3.36155V10.3638H3.36156V9.36384ZM4.51509 9.17132C4.50025 9.18265 4.43914 9.21933 4.22487 9.25789C4.01538 9.2956 3.73074 9.32443 3.31181 9.36633L3.41131 10.3614C3.81346 10.3211 4.14464 10.2884 4.402 10.2421C4.65458 10.1966 4.91135 10.1268 5.12174 9.9663L4.51509 9.17132ZM4.70732 8.70725C4.73124 8.88524 4.65786 9.06238 4.5151 9.17132L5.12174 9.9663C5.55004 9.63946 5.77016 9.10804 5.69841 8.57408L4.70732 8.70725ZM3.9943 7.71844C4.26093 8.04432 4.44182 8.26599 4.5633 8.4408C4.68756 8.61959 4.70484 8.68875 4.70732 8.70725L5.69841 8.57408C5.66317 8.31178 5.53094 8.08087 5.38448 7.87012C5.23524 7.65537 5.0242 7.39802 4.76826 7.0852L3.9943 7.71844ZM3.43283 6.86614C3.48393 7.02617 3.56508 7.16171 3.65618 7.28959C3.74439 7.4134 3.86045 7.55484 3.9943 7.71844L4.76826 7.0852C4.62599 6.91132 4.53497 6.79966 4.47063 6.70935C4.40918 6.6231 4.39232 6.58349 4.38545 6.56197L3.43283 6.86614ZM3.48532 5.81371C3.34112 6.14663 3.32247 6.52052 3.43283 6.86614L4.38544 6.56197C4.34866 6.44676 4.35488 6.32213 4.40294 6.21116L3.48532 5.81371ZM4.12878 5.02153C3.97933 5.17099 3.84977 5.30018 3.74969 5.41459C3.64632 5.53276 3.55209 5.65955 3.48532 5.81371L4.40294 6.21116C4.41192 6.19042 4.43264 6.15269 4.50236 6.07299C4.57536 5.98953 4.67704 5.88749 4.83589 5.72864L4.12878 5.02153ZM5.0221 4.12822L4.12878 5.02154L4.83589 5.72864L5.72921 4.83532L5.0221 4.12822ZM5.0221 4.12821L5.0221 4.12822L5.72921 4.83532L5.72921 4.83532L5.0221 4.12821ZM5.81398 3.48494C5.65989 3.55171 5.53315 3.64591 5.41502 3.74925C5.30065 3.8493 5.1715 3.97881 5.0221 4.12821L5.72921 4.83532C5.888 4.67653 5.99001 4.57489 6.07343 4.50191C6.15311 4.43221 6.19082 4.41149 6.21155 4.40251L5.81398 3.48494ZM6.86677 3.43243C6.52105 3.32199 6.147 3.34065 5.81398 3.48494L6.21155 4.40251C6.32256 4.35442 6.44724 4.3482 6.56248 4.38501L6.86677 3.43243ZM7.71882 3.99378C7.55526 3.85997 7.41386 3.74394 7.29008 3.65575C7.16225 3.56467 7.02675 3.48354 6.86677 3.43243L6.56248 4.38501C6.58399 4.39188 6.62359 4.40874 6.70982 4.47018C6.80011 4.53451 6.91175 4.62551 7.08558 4.76774L7.71882 3.99378ZM8.70718 4.70654C8.6887 4.70405 8.61957 4.68676 8.44085 4.56255C8.26613 4.44111 8.04455 4.26029 7.71882 3.99378L7.08558 4.76774C7.39826 5.02357 7.6555 5.23451 7.87013 5.38369C8.08078 5.5301 8.31156 5.66229 8.57371 5.69759L8.70718 4.70654ZM9.17149 4.51422C9.06252 4.6571 8.88526 4.73052 8.70718 4.70654L8.57371 5.69759C9.10797 5.76954 9.63975 5.54927 9.96665 5.12062L9.17149 4.51422ZM9.36635 3.31155C9.32448 3.73026 9.29566 4.01474 9.25799 4.22412C9.21945 4.43828 9.1828 4.49938 9.17149 4.51422L9.96665 5.12062C10.127 4.9103 10.1968 4.65367 10.2422 4.40121C10.2885 4.14399 10.3212 3.81299 10.3614 3.41106L9.36635 3.31155ZM9.57179 2.31256C9.49485 2.46176 9.45643 2.61489 9.43046 2.76962C9.4053 2.91943 9.38737 3.10139 9.36635 3.31155L10.3614 3.41106C10.3837 3.18768 10.3983 3.04447 10.4167 2.93519C10.4342 2.83083 10.4502 2.79092 10.4606 2.77085L9.57179 2.31256ZM10.3536 1.60501C10.016 1.73847 9.73818 1.98986 9.57179 2.31255L10.4606 2.77085C10.5161 2.66329 10.6086 2.57949 10.7212 2.535L10.3536 1.60501ZM11.3681 1.5C11.1569 1.5 10.974 1.49974 10.8225 1.50986C10.6659 1.52031 10.5097 1.54331 10.3536 1.60501L10.7212 2.535C10.7422 2.5267 10.7835 2.51469 10.8891 2.50764C10.9997 2.50026 11.1436 2.5 11.3681 2.5V1.5ZM12.6318 1.5H11.3681V2.5H12.6318V1.5ZM13.6465 1.60507C13.4904 1.54333 13.3341 1.52033 13.1776 1.50987C13.0259 1.49974 12.8431 1.5 12.6318 1.5V2.5C12.8563 2.5 13.0003 2.50026 13.1109 2.50764C13.2165 2.5147 13.2578 2.52672 13.2789 2.53502L13.6465 1.60507ZM14.4281 2.31242C14.2618 1.98984 13.9841 1.73852 13.6465 1.60507L13.2789 2.53502C13.3914 2.57951 13.4839 2.66328 13.5394 2.7708L14.4281 2.31242ZM15.5 12C15.5 13.933 13.933 15.5 12 15.5V16.5C14.4853 16.5 16.5 14.4853 16.5 12H15.5ZM12 8.5C13.933 8.5 15.5 10.067 15.5 12H16.5C16.5 9.51472 14.4853 7.5 12 7.5V8.5ZM8.5 12C8.5 10.067 10.067 8.5 12 8.5V7.5C9.51472 7.5 7.5 9.51472 7.5 12H8.5ZM12 15.5C10.067 15.5 8.5 13.933 8.5 12H7.5C7.5 14.4853 9.51472 16.5 12 16.5V15.5Z" fill="#222222"></path> </g></svg>
//     </span>`;
// settingBtn.innerHTML = settingBtnText;

// toolbarBtnGroup.appendChild(plusBtn);
// toolbarBtnGroup.appendChild(aiBtn);
// toolbarBtnGroup.appendChild(settingBtn);

// toolbarContainer.appendChild(logoImg);
// toolbarContainer.appendChild(toolbarBtnGroup);

// const contentContainer = document.createElement('div');
// contentContainer.className = "umix-content-container";

// const flyingBtn = document.createElement('button');
// flyingBtn.className = "umix-flying-btn";
// const flyingBtnText = `<span class="btn-icon">
//         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
//     </span>`;
// flyingBtn.innerHTML = flyingBtnText
// flyingBtn.addEventListener("click", function (event) {
//     if (currentTabId === "tabA") {
//         openTab(event, "tabB", 2);
//     } else {
//         openTab(event, "tabA", 1)
//     }
// }, false);

// const contentTitle = document.createElement('div');
// contentTitle.className = "umix-content-title";
// contentTitle.innerText = "Create Test";

// const label = document.createElement('div');
// label.className = "umix-input-label";
// label.innerText = "Test Name";

// const inputTitle = document.createElement('input');
// inputTitle.setAttribute("type", "text");
// inputTitle.setAttribute("id", "name");
// inputTitle.setAttribute("name", "title");
// inputTitle.setAttribute("placeholder", "Test Name");
// inputTitle.className = "umix-input-title";

// // <!-- Tab links -->
// const tab = document.createElement('div');
// tab.className = "umix-tab";

// const tabBtnA = document.createElement('button');
// tabBtnA.className = "umix-tab-links active";
// tabBtnA.innerText = "Variant A";
// tabBtnA.addEventListener('click', function (e) {
//     openTab(e, "tabA");
// }, false);

// const tabBtnB = document.createElement('button');
// tabBtnB.className = "umix-tab-links";
// tabBtnB.innerText = "Variant B";
// tabBtnB.addEventListener('click', function (e) {
//     openTab(e, "tabB");
// }, false);

// tab.appendChild(tabBtnA);
// tab.appendChild(tabBtnB);

// // <!-- Tab content -->
// const tabContentA = document.createElement('div');
// tabContentA.className = "umix-tab-content";
// tabContentA.setAttribute("id", "tabA");

// const selectTabA = document.createElement("select");
// selectTabA.setAttribute("name", "select-tabA");
// selectTabA.setAttribute("id", "select-tabA");
// selectTabA.className = "umix-select";

// const optionCssA = document.createElement("option");
// optionCssA.setAttribute("value", "css");
// optionCssA.setAttribute("name", "css");
// optionCssA.innerText = "css";
// const optionJsA = document.createElement("option");
// optionJsA.setAttribute("value", "javascript");
// optionJsA.setAttribute("name", "javascript");
// optionJsA.innerText = "javascript";

// selectTabA.appendChild(optionCssA);
// selectTabA.appendChild(optionJsA);

// const textAreaA = document.createElement('textarea');
// textAreaA.setAttribute("id", "cssA");
// textAreaA.setAttribute("rows", 6);
// textAreaA.setAttribute("cols", 35);
// textAreaA.className = "umix-textarea";

// const tabContentB = document.createElement('div');
// tabContentB.className = "umix-tab-content";
// tabContentB.setAttribute("id", "tabB");

// const selectTabB = document.createElement("select");
// selectTabB.setAttribute("name", "select-tabB");
// selectTabB.setAttribute("id", "select-tabB");
// selectTabB.className = "umix-select"

// const optionCssB = document.createElement("option");
// optionCssB.setAttribute("value", "css");
// optionCssB.setAttribute("name", "css");
// optionCssB.innerText = "css";
// const optionJsB = document.createElement("option");
// optionJsB.setAttribute("value", "javascript");
// optionJsB.setAttribute("name", "javascript");
// optionJsB.innerText = "javascript"

// selectTabB.appendChild(optionCssB);
// selectTabB.appendChild(optionJsB);

// const textAreaB = document.createElement('textarea');
// textAreaB.setAttribute("id", "cssA");
// textAreaB.setAttribute("rows", 6);
// textAreaB.setAttribute("cols", 35);
// textAreaB.className = "umix-textarea";

// tabContentA.appendChild(selectTabA);
// tabContentA.appendChild(textAreaA);

// tabContentB.appendChild(selectTabB);
// tabContentB.appendChild(textAreaB);

// tab.appendChild(tabContentA);
// tab.appendChild(tabContentB);

// const buttonGroup = document.createElement('div');
// buttonGroup.className = "umix-button-group";

// const createBtn = document.createElement('button');
// createBtn.className = "umix-create-btn";
// createBtn.innerText = "Create A/B Test";

// buttonGroup.appendChild(createBtn);

// contentContainer.appendChild(contentTitle);
// contentContainer.appendChild(label);
// contentContainer.appendChild(inputTitle);
// contentContainer.appendChild(tab);
// contentContainer.appendChild(buttonGroup);
// contentContainer.appendChild(flyingBtn);

// umixTotalContainer.appendChild(toolbarContainer);
// umixTotalContainer.appendChild(contentContainer);

// umixFinalContainer.appendChild(umixAIContainer);
// umixFinalContainer.appendChild(umixTotalContainer);

// document.body.appendChild(umixFinalContainer);

// if (currentTabId === "tabA") {
//     selectAIField.value = selectTabA.options[selectTabA.selectedIndex].text;
// } else {
//     selectAIField.value = selectTabB.options[selectTabB.selectedIndex].text;
// }

// let isOn = false;

// function openTab(event, target, flag) {
//     currentTabId = target
//     // Get all elements with class="tabcontent" and hide them
//     let tabContents = document.getElementsByClassName("umix-tab-content");
//     for (i = 0; i < tabContents.length; i++) {
//         tabContents[i].style.display = "none";
//     }

//     // Get all elements with class="tablinks" and remove the class "active"
//     let tabLinks = document.getElementsByClassName("umix-tab-links");
//     for (i = 0; i < tabLinks.length; i++) {
//         tabLinks[i].className = tabLinks[i].className.replace(" active", "");
//     }

//     // Show the current tab, and add an "active" class to the button that opened the tab
//     document.getElementById(target).style.display = "block";
//     if (flag === 2) {
//         tabLinks[1].className += " active";
//     } else if (flag === 1) {
//         tabLinks[0].className += " active";
//     } else
//         event.currentTarget.className += " active";
// }

// // Appends CSS content to the head of the site
// const appendCSS = s => document.head.appendChild(document.createElement("style")).innerHTML = s;

// plusBtn.addEventListener("click", function (event) {
//     contentContainer.classList.add("display-block");
//     if (umixAIContainer.className.includes("display-block")) {
//         umixAIContainer.classList.remove("display-block")
//     }
// }, false);

// aiBtn.addEventListener("click", function (event) {
//     umixAIContainer.classList.add("display-block");
//     if (contentContainer.className.includes("display-block")) {
//         contentContainer.classList.remove("display-block")
//     }
//     if (currentTabId === "tabA") {
//         selectAIField.value = selectTabA.options[selectTabA.selectedIndex].text;
//     } else {
//         selectAIField.value = selectTabB.options[selectTabB.selectedIndex].text;
//     }
// }, false);

// textAreaA.addEventListener("input", function (event) {
//     currentTextAreaAStr = event.target.value;
//     appendCSS(currentTextAreaAStr);
// }, false);

// textAreaA.addEventListener("change", function (event) {
//     currentTextAreaAStr = event.target.value;
//     appendCSS(currentTextAreaAStr);
// }, false);

// aiDescription.addEventListener("change", function (event) {
//     currentAIDescription = event.target.value;
// }, false);

// selectTabA.addEventListener("change", function() {
//     selectAIField.value = selectTabA.options[selectTabA.selectedIndex].text;
// }, false);

// selectTabB.addEventListener("change", function() {
//     selectAIField.value = selectTabB.options[selectTabB.selectedIndex].text;
// }, false);

// generateAIBtn.addEventListener('click', function () {
//     let currentSelectAIOption = selectAIField.options[selectAIField.selectedIndex].text;
//     let html = currentTabId === "tabA" ? currentTextAreaAStr : currentTextAreaBStar;
//     if (currentSelectAIOption && currentAIDescription) {
//         fetch(`http://localhost:3001/` + currentSelectAIOption, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 "html": html,
//                 "description": currentAIDescription,
//             }),
//         })
//             .then((response) => response.json()) // Convert the response to JSON
//             .then((data) => {
//                 if (data.output.output) {
//                     if (currentTabId === "tabA") {
//                         textAreaA.value = data.output.output;
//                         textAreaA.dispatchEvent(new Event('input'));
//                     } else {
//                         textAreaB.value = data.output.output;
//                         textAreaB.dispatchEvent(new Event('input'));
//                     }
//                 }
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }
// }, false);

// createBtn.addEventListener('click', function () {
//     if (inputTitle.value && currentTextAreaAStr) {
//         fetch("https://api.croboost.ai/v1/ab/tests/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer eyJraWQiOiI5dlJtS2EyNXJCZlBtQXdGRWhKeVp5TXpNVzNaRVE4XC81UHo0QzhmWk5IYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYTRmNjI2ZS03YWEyLTQyNzUtYWYxZi0yZDg1YzdiMGEzNTIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9WYTk4UnNBbU4iLCJjbGllbnRfaWQiOiI1cTJoY3FnMDhwdXQyOHNpazE4ZjZpaWpubyIsIm9yaWdpbl9qdGkiOiJlNWI5ZGQwNi1hZjhiLTRjMDQtOTBmNi0xZTFlZWU3ZWFmMWUiLCJldmVudF9pZCI6Ijk1MDM5NjAyLWJlNTktNGQzMi1hYjY3LTU2NjM1ZGYxZDhkYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTc2NDM4NDUsImV4cCI6MTY5NzY0NzQ0NSwiaWF0IjoxNjk3NjQzODQ1LCJqdGkiOiIxMmY1ZjljMS03ZmQ5LTRmMDQtOGRlYy03Y2FiMzU0YjI1ZWIiLCJ1c2VybmFtZSI6IjFhNGY2MjZlLTdhYTItNDI3NS1hZjFmLTJkODVjN2IwYTM1MiJ9.dbpwdW9Rox_DGBtJqfRo1HLwj-MyDPLLrt8g-fQfkdK5UCUo6csLxjD_Qyakh9QvqiIUke9NFRJP6HyGhEYWxVn9pexir0CBUhFz5SxgcbYLicZ0yo8vs_kLzWA9NyVQ7sx_WxuqbH9btSLo7VyS1UBhcMF2vJXum7Y0LEB8s-lweTXQLCrexRH__a8rhXQCTA8aVQIRskWVv7QlfRzXKa7-ZdMjdyl-S2Im83lYMPehM1vLizPKQIWAxeNr56MGFZP3orkStsZW3PyVs7BM0ZwUNeJD3fZ-V-RQZJiNTj6Gb1BlbqXYrPl0PgkZh62tY7wmbuVEwPask-8MBCypFQ"
//             },
//             body: JSON.stringify({
//                 title: inputTitle.value,
//                 data: currentTextAreaAStr,
//                 is_live: false
//             }),
//         })
//             .then((response) => response.json()) // Convert the response to JSON
//             .then((data) => {
//                 console.log(data);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }
// }, false);

// img.addEventListener("click", function () {
//     const currentToggle = localStorage.getItem("toggle");
//     localStorage.setItem("toggle", currentToggle === "true" ? "false" : "true");
//     isOn = !isOn;
//     if (!isOn) {
//         isClicked = false;
//         if (currentPopup) {
//             currentPopup.remove();
//             currentPopup = null;
//         }
//         if (selectedElement) {
//             selectedElement.classList.remove("highlight-on-hover");
//         }
//         selectedElement = null;
//     }
//     document.jsConfetti.addConfetti({});
//     document.jsConfetti.addConfetti({});
//     document.jsConfetti.addConfetti({});
// });
// document.jsConfetti.addConfetti({});
// document.jsConfetti.addConfetti({});
// document.jsConfetti.addConfetti({});

// img.addEventListener("mouseover", function () {
//     console.log("mouse over now");
//     img.style.width = "160px";
//     img.style.height = "160px";
//     img.style.bottom = "5px";
//     img.style.right = "5px";
// });

// img.addEventListener("mouseout", function () {
//     img.style.width = "150px";
//     img.style.height = "150px";
//     img.style.bottom = "10px";
//     img.style.right = "10px";
// });

// img.addEventListener("contextmenu", function (event) {
//     event.preventDefault();
//     window.location.href = "https://github.com/pranavnt/dubhacks22";
// });

// // Append the button to the document body
// document.body.appendChild(img);

// let selectedElement = null;
// let currentPopup = null;
// let isClicked = false;

// function extractHtmlContent(mixedString) {
//     // Match all HTML tags and their content
//     const matches = mixedString.match(/<[^>]*>[^<]*<\/[^>]*>|<[^/>]+\/>/g);

//     // If matches are found, join them to form the pure HTML content; otherwise, return an empty string
//     return matches ? matches.join("") : "";
// }

// function cleanHtml(str) {
//     str = str.split(/\>[ ]?\</).join(">\n<");
//     str = str.split(/([*]?\{|\}[*]?\{|\}[*]?)/).join("\n");
//     str = str.split(/[*]?\;/).join("\;\n    ");
//     return str;
// }

// document.addEventListener("mouseover", (e) => {
//     if (isClicked) return;
//     if (e.target?.className.includes("umix-popup")) return;

//     // check if the mouse is over the variable named img
//     if (e.target === img) return;

//     const x = e.clientX;
//     const y = e.clientY;
//     const element = document.elementFromPoint(x, y);

//     if (selectedElement) {
//         selectedElement.classList.remove("highlight-on-hover");
//     }

//     selectedElement = element;

//     // Add highlight effect to the selected element
//     selectedElement.classList.add("highlight-on-hover");
// });

// document.addEventListener("keydown", function (event) {
//     if (event.key === "Escape") {
//         isClicked = false;
//         if (currentPopup) {
//             currentPopup.remove();
//             currentPopup = null;
//         }
//         if (selectedElement) {
//             selectedElement.classList.remove("highlight-on-hover");
//         }
//         selectedElement = null;
//     }
// });

// document.addEventListener("dblclick", (e) => {
//     if (e.target === img) return;

//     if (
//         currentPopup &&
//         selectedElement &&
//         e.target !== selectedElement &&
//         !selectedElement.contains(e.target) &&
//         e.target !== currentPopup &&
//         !currentPopup.contains(e.target)
//     ) {
//         isClicked = false;
//         if (currentPopup) {
//             currentPopup.remove();
//             currentPopup = null;
//         }
//         if (selectedElement) {
//             selectedElement.classList.remove("highlight-on-hover");
//         }
//         selectedElement = null;
//         return;
//     }

//     isClicked = true;

//     if (!selectedElement) return;
//     let currentEl = selectedElement;
//     if (
//         e.target?.className.includes("umix-popup") ||
//         !selectedElement.className.includes("highlight-on-hover")
//     )
//         return;
//     if (currentPopup) {
//         currentPopup.remove();
//         currentPopup = null;
//     }

//     // defines text area, button, and popup
//     const input = document.createElement("textarea");
//     const button = document.createElement("button");
//     const popup = document.createElement("div");

//     popup.className = "umix-popup umix-container";
//     button.className = "umix-popup umix-button";
//     input.className = "umix-popup umix-input";
//     input.placeholder =
//         "Make the text larger or change the colors of this element.";
//     input.style.color = "black";
//     button.style.color = "black";
//     popup.style.position = "fixed";
//     const x = e.clientX;
//     const y = e.clientY;
//     popup.style.left = `${x}px`;
//     popup.style.top = `${y}px`;
//     popup.style.zIndex = "99999";

//     const buttonText = `<span class="arrow-icon">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>
//     </span>`;

//     const callback = () => {
//         if (!isOn) return;
//         currentEl.classList.remove("highlight-on-hover");
//         button.textContent = "Loading...";
//         fetch(`http://localhost:3001/html`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 html: currentEl.outerHTML,
//                 description: input.value,
//             }),
//         })
//             .then((response) => response.json()) // Convert the response to JSON
//             .then((data) => {
//                 try {
//                     let html = extractHtmlContent(data.output.output);
//                     plusBtn.dispatchEvent(new Event('click'));
//                     html = cleanHtml(html);
//                     textAreaA.value = html;

//                     const fragment = document.createElement("div");
//                     fragment.innerHTML = html;
//                     button.innerHTML = buttonText;

//                     currentEl.replaceWith(fragment);
//                     currentEl = fragment;
//                 } catch (error) {
//                     console.error(error);
//                 }
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     };

//     input.onkeypress = (event) => {
//         if (!isOn) return;
//         if (event.key === "Enter") {
//             event.preventDefault(); // Enter no longer makes a new line
//             callback();
//         }
//     };

//     button.onclick = callback;
//     button.innerHTML = buttonText;

//     popup.appendChild(input);
//     popup.appendChild(button);

//     document.body.appendChild(popup);

//     currentPopup = popup;
//     currentEl.classList.add("highlight-on-hover");
// });