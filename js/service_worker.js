var backendUrl = "http://localhost:3001/";
var apiUrl = "https://api.croboost.ai/v1/";

chrome.runtime.onMessage.addListener(function (message, sender, senderResponse) {
    if (message.message === "login") {
        fetch(apiUrl + 'auth/manual/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: message.payload.email, password: message.payload.password})
        }).then(res => {
            return res.json();
        }).then(res => {
            senderResponse(res);
        })
    }

    if (message.message === "signup") {
        fetch(apiUrl + 'auth/manual/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: message.payload.email,
                confirm_email: message.payload.email,
                password: message.payload.password,
                confirm_password: message.payload.password
            })
        }).then(res => {
            return res.json();
        }).then(res => {
            senderResponse(res);
        })
    }
    if (message.message === "tests") {
        fetch(apiUrl+'ab/tests/', {
            method: 'GET',
            headers: {
                'Authorization': "Bearer "+ message.payload.token
            },
        }).then(res => {
            return res.json();
        }).then(res => {
            senderResponse(res);
        })
    }
    if (message.message === "view") {
        fetch(apiUrl+'metrics/'+message.payload.record_id, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer "+ message.payload.temp.access_token
            },
        }).then(res => {
            return res.json();
        }).then(res => {
            senderResponse(res);
        })
    }

    if (message.message === "createTest") {
        console.log(message.payload.data);
        fetch(apiUrl+'ab/tests/', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer "+ message.payload.token.access_token
            },
            body: message.payload.data
        }).then(res => {
            return res.json();
        }).then(res => {
            senderResponse(res);
        })
    }

    if (message.message === "getAi") {
        fetch(backendUrl+message.payload.aiOption, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: message.payload.data
        }).then(res => {
            return res.json();
        }).then(res => {
            senderResponse(res);
        })
    }
    if (message.message === "html") {
        fetch(backendUrl+'html', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: message.payload.data
        }).then(res => {
            return res.json();
        }).then(res => {
            senderResponse(res);
        })
    }
    return true
});
