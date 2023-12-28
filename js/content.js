localStorage.setItem("toggle", false);
// // Global variable
let currentTabId = "tabA";
let currentTextAreaAStr = "";
let currentTextAreaBStar = "";
let currentAIDescription = "";
let viewData_title = "";
var imagePath = chrome.runtime.getURL("images");
let isOn = false;

const TestNames = ["Original", "Variant"];

  const constructSnowplowStorageAdapter = () => `{
    onExposure: function(obj){
      snowplow('trackSelfDescribingEvent', {
        event: {
          schema: 'iglu:io.mintmetrics.mojito/mojito_exposure/jsonschema/1-0-0',
          data: {
            'waveId': obj.options.id,
            'waveName': obj.options.name,
            'recipe': obj.chosenRecipe.name
          }
        }
      });
    },
    onVeilTimeout: function(obj, ultimateRecipe){},
    onRecipeFailure: function(obj, err){
      snowplow('trackSelfDescribingEvent', {
        event: {
          schema: 'iglu:io.mintmetrics.mojito/mojito_failure/jsonschema/1-0-0',
          data: {
            'waveId': obj.options.id,
            'waveName': obj.options.name,
            'component': obj.chosenRecipe.name || 'trigger',
            'error': err
          }
        }
      });
      // Refresh the page unless we're in a trigger or preview mode
      var preview = document.location.search.indexOf('mojito_' + obj.options.id + '=' + obj.chosenRecipe.id) > -1;
      if (obj.chosenRecipe.name && !obj.options.divertTo && !preview) {
        // Disable the experiment on future page loads, and refresh
        Mojito.Cookies.set('_mojito_' + obj.options.id + (obj.options.state === 'live'?'':'-staging'), '0.0');
        setTimeout(function(){
          window.location.reload();
        }, 500);
      }
    }
  }`
  function constructTest(data) {
    return `Mojito.addTest({
      id: "${data.id}",
      name: "${data.name}",
      sampleRate: ${data.sampleRate},
      state: "live",
      description:"${data.description}",
      trigger: ${data.trigger},
      recipes: {
      "0": {
        name: "Original",
        ${data.Original.codeJS &&
      `js: function () {
          ${data.Original.codeJS}
        },`
      }
        ${data.Original.codeCSS && `css: \`${data.Original.codeCSS}\`,`}
      },
    ${[data.Variant]
        .map(
          (plan, i) => `
      "${i + 1}": {
        name: "${TestNames[i + 1]}",
        ${plan.codeJS &&
            `js: function () {
          ${plan.codeJS}
        },`
            }
        ${plan.codeCSS && `css: \`${plan.codeCSS}\`,`}
      },`
        )
        .join("\n")}
    },
    options: {
      storageAdapter: ${constructSnowplowStorageAdapter()}
    }
  });`;
  }

$(document).ready(function (){
    var content = `
        <div class="extension-container umix-popup">
            <div class="loginContainer p-4 umix-popup" id="loginContainer">
                <h2 class="loginTitle umix-popup" id="loginTitle">Sign In</h2>
                <strong id="loginDetails umix-popup"></strong>
                <form class="loginForm umix-popup" id="loginForm">
                    <div class="form-group umix-popup">
                        <label class="form-label umix-popup">Email Address</label>
                        <input type="text" id="loginEmail" class="form-control umix-popup"  placeholder="email@gmail.com" required>
                        <span class="mail-error umix-popup"></span>
                    </div>
                    <div class="form-group umix-popup">
                        <label class="form-label umix-popup">Password</label>
                        <input type="password" id="loginPassword" class="form-control umix-popup"  required placeholder="At least 8 characters">
                        <span class="password-error umix-popup"></span>
                    </div>
                    <button class="btn btn-signin btn-block umix-popup" id="loginBtn" type="button">Sign In</button>
                    <a class="btn-link umix-popup" type="button" id="redirectSignupBtn">Signup</a>
                </form>
            </div>
            <div class="signupContainer p-4 umix-popup" id="signupContainer" style="display: none">
                <h2 class="text-center signupTitle umix-popup" id="signupTitle">Signup</h2>
                <strong id="signupDetails umix-popup"></strong>
                <form class="signupForm umix-popup" id="signupForm">
                    <div class="form-group umix-popup">
                        <label class="form-label umix-popup">Name</label>
                        <input type="text" id="signupName" name="name" class="form-control umix-popup" placeholder="Enter your name">
                        <span class="email-error umix-popup"></span>
                    </div>
                    <div class="form-group umix-popup">
                        <label class="form-label umix-popup">Email Address</label>
                        <input type="text" id="signupEmail" class="form-control umix-popup" placeholder="email@email.com">
                        <span class="email-error umix-popup"></span>
                    </div>
                    <div class="form-group umix-popup">
                        <label class="form-label umix-popup">Password</label>
                        <input type="password" id="signupPassword" class="form-control umix-popup" placeholder="password">
                        <span class="pwd-error umix-popup"></span>
                    </div>
                    <div class="form-group umix-popup">
                        <label class="form-label umix-popup">Confirm Password</label>
                        <input type="password" id="confirmPassword" class="form-control umix-popup" placeholder="confirm password">
                        <span class="cfm-error umix-popup"></span>
                    </div>
                    <button class="btn btn-signup btn-block umix-popup" type="button" id="signupBtn">Signup</button>
                    <a class="btn-link umix-popup" type="button" id="redirectLoginBtn">Sign In</a>
                </form>
            </div>
            
            
            <div class="umix-final-container umix-popup p-2" style="display:none">
                <div class="umix-total-container umix-popup">
                    <div class="umix-toolbar-container umix-popup">
                        <div class="logo-container umix-popup">
                            <img src="`+imagePath+`/cro.svg" alt="logo" class="umix-popup">
                            <img src="`+imagePath+`/arrow.svg" alt="logo" class="arrow-btn umix-popup">
                        </div>
                        <button type="button" class="umix-toolbar-btn plus-btn umix-popup">
                            <span class="btn-icon umix-popup">
                                <img src="`+imagePath+`/plus.svg" class="umix-ai-icon umix-popup" alt="ai-icon">
                            </span>
                        </button>
                        <button type="button" class="umix-toolbar-btn cursor-btn umix-popup">
                            <span class="btn-icon umix-popup">
                                <img src="`+imagePath+`/cursor.svg" class="umix-ai-icon umix-popup" alt="ai-icon" >
                            </span>
                        </button>
                    </div>
                    <div class="menu-container umix-popup" style="display:none">
                        <a class="view-test-btn umix-popup">Test Data</a>
                        <a class="create-test-btn umix-popup">Create New Test</a>
                        <a class="logout-btn umix-popup">Logout</a>
                    </div>
                    <div class="umix-ai-container umix-popup p-3">
                        <div class="title-header umix-popup">
                            <div class="umix-content-title umix-popup umix-ai-title">AI Editor</div>
                            <img src="`+imagePath+`/close.svg" class="umix-ai-icon umix-popup" style="width: 15px"/>
                        </div>
                        <label class="form-label umix-popup">Describe your A/B test idea to AI and watch it come to life.</label>
                        <textarea placeholder="Message to AI" id="ai-description" rows="3" cols="35" class="umix-textarea form-control umix-ai-description umix-popup"></textarea>
                        <label class="form-label umix-popup">Type</label>
                        <select name="select-ai-field" id="select-ai-field" class="umix-select umix-popup form-control">
                            <option value="css" name="css">CSS</option>
                            <option value="javascript" name="javascript">Javascript</option>
                        </select>
                        <button class="umix-create-btn umix-ai-generate-btn  umix-popup btn btn-block btn-default">Generate CSS</button>
                    </div>
                    <div class="umix-content-container umix-popup">
                        <div class="title-header umix-popup">
                            <div class="umix-content-title umix-popup">Create Test</div>
                            <img src="`+imagePath+`/close.svg" class="umix-ai-icon umix-popup" style="width: 15px"/>
                        </div>
                        <label class="form-label umix-popup">Test Name</label>
                        <input type="text" id="name" name="title" placeholder="Test Name" class="form-control umix-popup">
                        <div class="umix-tab umix-popup">
                            <ul id="myTab" class="nav nav-tabs">
                                <li class="umix-tab-links umix-popup variant-a active"><a href="#variantA" data-toggle="tab" class="umix-popup">Variant A</a></li>
                                <li class="umix-tab-links umix-popup variant-b"><a href="#variantB" data-toggle="tab" class="umix-popup">Variant B</a></li>
                            </ul>
                            <label class="form-label umix-popup">Variant Name</label>
                            <input type="text" id="VariantA_name" name="original_name" placeholder="Original Name" class="form-control umix-popup">
                            <input type="text" id="VariantB_name" name="variant_name" placeholder="Variant Name" class="form-control umix-popup" style="display: none;">
                            <div id="myTabContent" class="tab-content">
                                <div class="tab-pane active in" id="variantA">
                                    <div class="umix-tab-content umix-popup">
                                        <label class="form-label umix-popup">Type</label>
                                        <select name="select-tabA" id="select-tabA" class="umix-select umix-input-title  umix-popup">
                                            <option value="css" id="tabA_css" name="css">CSS</option>
                                            <option value="javascript" id="tabA_js" name="javascript">Javascript</option>
                                        </select>
                                        <textarea id="descriptionA_css" rows="6" cols="35" class="umix-textarea umix-ai-description  umix-popup form-control"></textarea>
                                        <textarea id="descriptionA_js" rows="6" cols="35" class="umix-textarea umix-ai-description  umix-popup form-control" style="display: none;"></textarea>
                                    </div>
                                </div>
                                <div class="tab-pane" id="variantB">
                                    <div class="umix-tab-content umix-popup">
                                        <label class="form-label umix-popup">Type</label>
                                        <select name="select-tabB" id="select-tabB" class="umix-select umix-input-title  umix-popup">
                                            <option value="css" id="tabB_css" name="css">CSS</option>
                                            <option value="javascript" id="tabB_js" name="javascript">Javascript</option>
                                        </select>
                                        <textarea id="descriptionB_css" rows="6" cols="35" class="umix-textarea umix-ai-description  umix-popup form-control"></textarea>
                                        <textarea id="descriptionB_js" rows="6" cols="35" class="umix-textarea umix-ai-description  umix-popup form-control" style="display: none;"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="umix-button-group umix-popup">
                            <button class="umix-create-btn umix-ai-create-btn umix-popup btn btn-block btn-default">Create A/B Test</button></div>
                         </div>
                    </div>
            </div>
            <div class="view-container umix-popup" style="display: none;">
                <button class="back-test umix-popup">Back</button>
                <br>
                <div class="test-title umix-popup">`+viewData_title+`</div>
                <canvas id="conversion" class="m-1 rounded" height = "220" style="background-color:#E9E9E9"></canvas>
                <canvas id="event" class="m-1 rounded" height = "220" style="background-color:#E9E9E9"></canvas>
                <canvas id="bounce" class="m-1 rounded" height = "220" style="background-color:#E9E9E9"></canvas>
                <canvas id="session" class="m-1 rounded" height = "220" style="background-color:#E9E9E9"></canvas>
            </div>
            <div class="test-container umix-popup" style="display:none">
                <div class="test-header umix-popup" style="display: flex; justify-content: space-between">
                    <span><strong style="color: black">A/B Tests</strong></span>
                    <a class="back-create">Back</button>
                </div>
                <div class="test-body umix-popup"></div>
                <div class="test-footer umix-popup">
                    <button class="btn btn-create-test btn-block umix-popup">Create A/B Test</button>
                </div>
            </div>
        </div>`

    $("body").append(content);

    chrome.storage.local.get("access_token").then((result) =>{
        if(Object.keys(result).length != 0){
            $(".loginContainer").css("display", "none");
            $(".umix-final-container").css("display", "block")
        }
    });

    $(".btn-create-test").click(function(){
        $(".umix-ai-container").css("display","block");
        $(".test-container").css("display","none");
        $(".umix-content-container").css("display","block");
    });

    $("#redirectSignupBtn").click(function(){
        $("#loginContainer").css("display","none");
        $("#signupContainer").css("display", "block");
    })
    $("#redirectLoginBtn").click(function(){
        $("#loginContainer").css("display","block");
        $("#signupContainer").css("display", "none");
    })
    $(".logo-container").click(function(){
        if($(".menu-container").css("display") == "none"){
            $(".menu-container").css("display","flex");
            $(".test-container").css("display","none");
            $(".view-container").css("display","none");
            $(".umix-content-container").css("display","none");
            $(".umix-ai-container").css("display","none");
            $(".arrow-btn").css({ WebkitTransform: 'rotate(-180deg)'});
        }else{
            $(".menu-container").css("display","none");
            $(".arrow-btn").css({ WebkitTransform: 'rotate(0deg)'});
        }
    })
    $(".logout-btn").click(function(){
        chrome.storage.local.clear(function(){
            var error = chrome.runtime.lastError;
            if(error){
                console.log(error);
            }else{
                localStorage.setItem("toggle", false);
                $(".loginContainer").css("display", "block");
                $(".umix-final-container").css("display", "none");
                $(".test-container").css("display","none");
                $(".view-container").css("display","none");
                $(".menu-container").css("display","none");
            }
        })
    })
    $(".view-test-btn").click(function(){
        $(".umix-ai-container").css("display","none");
        $(".umix-content-container").css("display","none");
        chrome.storage.local.get("access_token").then((temp) =>{
            chrome.runtime.sendMessage({message: 'tests', payload: {"token":temp.access_token}}, response => {
                if(response){
                    // $(".test-title").html()
                    console.log("RESPONSE", response);
                    $(".menu-container").css("display", "none");
                    response.forEach((element, index) => {
                        console.log("view-data view-btn-",index, `view-btn-`,index);
                        let str = `<div class="card m-1 test-data umix-popup">
                            <div class="card-body umix-popup">
                            <h5 class="card-title umix-popup">`+element.title+`</h5>
                            <a class="view-data view-btn-`+index+` umix-popup" data-record="`+element.record_id+`">View Data</button>
                            <br>
                            <span class="error-view-`+index+` umix-popup"</span>
                            </div>
                        </div>`
                        $(".test-body").append(str);
                        $(".test-container").css("display","block");
                        $(".view-btn-"+index).click(function(){
                            console.log("each button",".view-btn-"+index);
                            var record_id = $(this).attr("data-record");
                            console.log("Record ID", record_id, temp.access_token);
                            chrome.runtime.sendMessage({message: 'view', payload: {record_id,temp}}, response => {
                                console.log("response",response);
                                if(response.detail){
                                    $(".error-view-"+index).html(response.detail);
                                    $(".error-view-"+index).css("color","red");
                                }else{
                                    $(".view-container").css("display","block");
                                    $(".test-container").css("display","none");
                                    viewData_title = response.test_name;
                                    console.log("TITLE",viewData_title);
                                    var conversionSet = getData(JSON.parse(response.data), "conversion");
                                    const conversion = $("#conversion");
                                    new Chart(conversion, {
                                        type: 'bar',
                                        data: conversionSet,
                                        options: {
                                            scales: {
                                                y:{
                                                    barPercentage: 0.4,
                                                    barThickness: 1
                                                },
                                                x:{
                                                    barPercentage: 0.4,
                                                    barThickness: 1
                                                }
                                            },
                                            indexAxis: 'y', // <-- here
                                            responsive: true,
                                            elements: {
                                                bar: {
                                                  borderWidth: 2,
                                                }
                                            },
                                            plugins: {
                                                legend: {
                                                  position: 'bottom',
                                                },
                                                title: {
                                                  display: true,
                                                  text: 'Conversion Rate %'
                                                }
                                            }
                                        }

                                    });

                                    var eventSet = getData(JSON.parse(response.data), "event");
                                    const event = $("#event");
                                    new Chart(event, {
                                        type: 'bar',
                                        data: eventSet,
                                        options: {
                                            indexAxis: 'y', // <-- here
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                  position: 'bottom',
                                                },
                                                title: {
                                                  display: true,
                                                  text: 'Avg. Event count'
                                                }
                                            }
                                        }
                                    });

                                    var bounceSet = getData(JSON.parse(response.data), "bounce");
                                    const bounce = $("#bounce");
                                    new Chart(bounce, {
                                        type: 'bar',
                                        data: bounceSet,
                                        options: {
                                            indexAxis: 'y', // <-- here
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                  position: 'bottom',
                                                },
                                                title: {
                                                  display: true,
                                                  text: 'Bounce Rate %'
                                                }
                                            }
                                        }
                                    });

                                    var sessionSet = getData(JSON.parse(response.data), "session");
                                    const session = $("#session");
                                    new Chart(session, {
                                        type: 'bar',
                                        data: sessionSet,
                                        options: {
                                            indexAxis: 'y', // <-- here
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                  position: 'bottom',
                                                },
                                                title: {
                                                  display: true,
                                                  text: 'Session Duration'
                                                }
                                            }
                                        }
                                    });
                                }
                            })
                            
                        })
                    });
                }
            });
        })
                
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
    $(".create-test-btn").click(function(){
        $(".menu-container").css("display","none");
        $(".umix-ai-container").css("display","none");
        $(".umix-content-container").css("display","block");
        $(".test-container").css("display","none");
    });

    $(".plus-btn").click(function (){
        $(".umix-content-container").css("display","block");
        $(".umix-ai-container").css("display","none");
        $(".menu-container").css("display","none");
        $(".test-container").css("display", "none");
        console.log("WHY");
        $("#descriptionA_js").css("display","none");
    });
    $("#select-ai-field").change(function(){
        if($("#select-ai-field").val() == "css"){
            $(".umix-ai-generate-btn").html("Generate CSS");
        }else{
            $(".umix-ai-generate-btn").html("Generate javascript");
        }
    })
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
    $(".cursor-btn").click(function () {
        // $(".umix-content-container").css("display","none");
        // $(".umix-ai-container").css("display","block");
        $(".umix-content-container").css("display","block");
        $(".umix-ai-container").css("display","none");
        const currentToggle = localStorage.getItem("toggle");
        localStorage.setItem("toggle", currentToggle === "true" ? "false" : "true");
        isOn = !isOn;
        if (!isOn) {
            isClicked = false;
            if (currentPopup) {
                currentPopup.remove();
                currentPopup = null;
            }
            if (selectedElement) {
                selectedElement.classList.remove("highlight-on-hover");
            }
            selectedElement = null;
        }
    });
    $("#select-tabA").click(function(){
        if($("#select-tabA").val() == "css"){
            $("#descriptionA_js").css("display","none");
            $("#descriptionA_css").css("display","block");
        }
        else{
            $("#descriptionA_js").css("display","block");
            $("#descriptionA_css").css("display","none");
        }
    })
    $("#select-tabB").click(function(){
        if($("#select-tabB").val() == "css"){
            $("#descriptionB_js").css("display","none");
            $("#descriptionB_css").css("display","block");
        }
        else{
            $("#descriptionB_js").css("display","block");
            $("#descriptionB_css").css("display","none");
        }
    })
    
    document.getElementById("descriptionA_css").addEventListener("input",handleCSSCodeChange_A);
    document.getElementById("descriptionB_css").addEventListener("input",handleCSSCodeChange_B);
    function handleCSSCodeChange_A(){
        // console.log("real-time");
        var cssCode;
        cssCode = $("#descriptionA_css").val();
        const styleElement = document.createElement('style');
        styleElement.textContent = cssCode;
        console.log("CSS Code", styleElement);
        document.head.appendChild(styleElement);
    }
    function handleCSSCodeChange_B(){
        // console.log("real-time");
        var cssCode;
        cssCode = $("#descriptionB_css").val();
        const styleElement = document.createElement('style');
        styleElement.textContent = cssCode;
        console.log("CSS Code", styleElement);
        document.head.appendChild(styleElement);
    }
    $(".umix-ai-create-btn").click(function () {
        const form_data = new Object({
            "name": $("#name").val(),
            "description": "chrome_extension",
            "id" : `ex${Date.now()}`,
            "sampleRate" : 1,
            "trigger" : "function (test) { if (document.location.pathname === '/') test.activate(); }",
            "Original": {
                "variantName": "Original",
                "codeCSS": $("#descriptionA_css").val(),
                "codeJS": $("#descriptionA_js").val()
            },
            "Variant": {
                "variantName": "Variant",
                "codeCSS": $("#descriptionB_css").val(),
                "codeJS": $("#descriptionB_js").val()
            }
        })
        const data = constructTest(form_data);
        console.log("form and mojito", data, form_data);

        var title = $("#name").val();
        var description = $("#descriptionA_css").val();
        if(title && description)
        {
            // const cssCode = $("#descriptionA_css").val();
            // const styleElement = document.createElement('style');
            // styleElement.textContent = cssCode;
            // document.head.appendChild(styleElement);
            const is_live = false;
            const original_variant = "body";
            const variant_variant = "body";
            chrome.storage.local.get("access_token").then((temp) =>{
                chrome.runtime.sendMessage({message: 'createTest', payload: {
                    token: temp, 
                    data: JSON.stringify({
                        title, data
                    })
                }
                
            }, response => {
                    console.log(response);
                }
            
            )})
        }
    });
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
        if(target == "#variantA"){
            currentTabId = "tabA";
            $(".variant-b").removeClass("active");
            $(".variant-a").addClass("active");
            $("#VariantA_name").css("display","block");
            $("#VariantB_name").css("display","none");
            handleCSSCodeChange_A();
        }else{
            currentTabId = "tabB";
            $(".variant-a").removeClass("active");
            $(".variant-b").addClass("active");
            $("#VariantA_name").css("display","none");
            $("#VariantB_name").css("display","block");
            handleCSSCodeChange_B();
        }
    });
    
})

function tabActive(index){
    if(index == 1){

    }
}
const appendCSS = s => document.head.appendChild(document.createElement("style")).innerHTML = s;
const appendScript = s => document.head.appendChild(document.createElement("script")).innerHTML = s;

function getData(res, type){
    var datasets = [];
    var colors = ["#A9E0F1", "#F5D6FF", "#ebdf84"];
    var borders = ["#1686AA","#7E269A","#f7db07"]
    res.forEach((el, index) => {
        var data = {label: el.Variant, borderColor: borders[index], backgroundColor: colors[index]}
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
    
    return {labels: [""], datasets:datasets}
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

let selectedElement = null;
let currentPopup = null;
let isClicked = false;

function extractHtmlContent(mixedString) {
    // Match all HTML tags and their content
    const matches = mixedString.match(/<[^>]*>[^<]*<\/[^>]*>|<[^/>]+\/>/g);

    // If matches are found, join them to form the pure HTML content; otherwise, return an empty string
    return matches ? matches.join("") : "";
}

function cleanHtml(str) {
    str = str.split(/\>[ ]?\</).join(">\n<");
    str = str.split(/([*]?\{|\}[*]?\{|\}[*]?)/).join("\n");
    str = str.split(/[*]?\;/).join("\;\n    ");
    return str;
}

document.addEventListener("mouseover", (e) => {
    const currentToggle = localStorage.getItem("toggle");
    if(currentToggle == "false") return;
    if (isClicked) return;
    if (e.target?.className.includes("umix-popup")) return;

    // check if the mouse is over the variable named img
    // if (e.target === img) return;

    const x = e.clientX;
    const y = e.clientY;
    const element = document.elementFromPoint(x, y);

    if (selectedElement) {
        selectedElement.classList.remove("highlight-on-hover");
    }

    selectedElement = element;

    // Add highlight effect to the selected element
    selectedElement.classList.add("highlight-on-hover");
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        isClicked = false;
        if (currentPopup) {
            currentPopup.remove();
            currentPopup = null;
        }
        if (selectedElement) {
            selectedElement.classList.remove("highlight-on-hover");
        }
        selectedElement = null;
    }
});

document.addEventListener("dblclick", (e) => {
    // if (e.target === img) return;

    if (
        currentPopup &&
        selectedElement &&
        e.target !== selectedElement &&
        !selectedElement.contains(e.target) &&
        e.target !== currentPopup &&
        !currentPopup.contains(e.target)
    ) {
        isClicked = false;
        if (currentPopup) {
            currentPopup.remove();
            currentPopup = null;
        }
        if (selectedElement) {
            selectedElement.classList.remove("highlight-on-hover");
        }
        selectedElement = null;
        return;
    }

    isClicked = true;

    if (!selectedElement) return;
    let currentEl = selectedElement;
    if (
        e.target?.className.includes("umix-popup") ||
        !selectedElement.className.includes("highlight-on-hover")
    )
        return;
    if (currentPopup) {
        currentPopup.remove();
        currentPopup = null;
    }
    const selected = e.target.className;
    const cssClasses = selected.split(" ");
    // const cssClassString = ".";
    // for (var i = 0; i < cssClasses.length; i++) {
    //     console.log("index", cssClasses.length, cssClasses[i]);
    //     cssClassString += cssClasses[i];
    //     console.log("Value", cssClassString);
    // }
    const convertedString = "." + cssClasses.join(".");
    const autoAdd = convertedString + " {\n\n}";
    // const cssClassName = selected.replace(" ",".");
    console.log("ClassName", e.target ,"cl",
    e.target.className);
    if(currentTabId == "tabA"){
        $("#descriptionA_css").val(autoAdd);
    }else{  
        $("#descriptionB_css").val(autoAdd);
    }
    selectedElement.classList.add("highlight-on-hover");

    // defines text area, button, and popup
    // const select = document.createElement("select");
    // const opt1 =  document.createElement("option");
    // opt1.value = "css";
    // opt1.innerHTML  = "css";
    // const opt2 =  document.createElement("option");
    // opt2.value = "html";
    // opt2.innerHTML  = "html";
    // select.append(opt1);
    // select.append(opt2);
    // const input = document.createElement("textarea");
    // const button = document.createElement("button");
    // const popup = document.createElement("div");

    // popup.className = "umix-popup umix-container";
    // button.className = "umix-popup umix-button form-control";
    // input.className = "umix-popup umix-input form-control";
    // select.className = "umix-popup umix-select form-control";
    // input.placeholder =
    //     "Make the text larger or change the colors of this element.";
    // input.style.color = "black";
    // button.style.color = "black";
    // popup.style.position = "fixed";
    // const x = e.clientX;
    // const y = e.clientY;
    // popup.style.left = `${x}px`;
    // popup.style.top = `${y}px`;
    // popup.style.zIndex = "99999";

    // const buttonText = `Generate AI`;

    // const callback = () => {
    //     if (!isOn) return;
    //     currentEl.classList.remove("highlight-on-hover");
    //     button.textContent = "Loading...";
    //     chrome.runtime.sendMessage({message: 'html', payload: {data: JSON.stringify({
    //             html: currentEl.outerHTML,
    //             description: input.value,
    //         })}}, response => {
    //             try {
    //             let html = extractHtmlContent(response.output.output);
    //             plusBtn.dispatchEvent(new Event('click'));
    //             html = cleanHtml(html);
    //             textAreaA.value = html;

    //             const fragment = document.createElement("div");
    //             fragment.innerHTML = html;
    //             button.innerHTML = buttonText;

    //             currentEl.replaceWith(fragment);
    //             currentEl = fragment;
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     })

        // fetch(`http://localhost:3001/html`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         html: currentEl.outerHTML,
        //         description: input.value,
        //     }),
        // })
        //     .then((response) => response.json()) // Convert the response to JSON
        //     .then((data) => {
        //         try {
        //             let html = extractHtmlContent(data.output.output);
        //             plusBtn.dispatchEvent(new Event('click'));
        //             html = cleanHtml(html);
        //             textAreaA.value = html;

        //             const fragment = document.createElement("div");
        //             fragment.innerHTML = html;
        //             button.innerHTML = buttonText;

        //             currentEl.replaceWith(fragment);
        //             currentEl = fragment;
        //         } catch (error) {
        //             console.error(error);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        
    // };

    // input.onkeypress = (event) => {
    //     if (!isOn) return;
    //     if (event.key === "Enter") {
    //         event.preventDefault(); // Enter no longer makes a new line
    //         callback();
    //     }
    // };

    // button.onclick = callback;
    // button.innerHTML = buttonText;
    // popup.appendChild(select);
    // popup.appendChild(input);
    // popup.appendChild(button);

    // document.body.appendChild(popup);

    // currentPopup = popup;
    // currentEl.classList.add("highlight-on-hover");
});