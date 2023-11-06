chrome.runtime.onMessage.addListener(function (message, sender, senderResponse) {
    if (message.message === "login") {
        fetch('https://api.croboost.ai/v1/auth/manual/login', {
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
        fetch('https://api.croboost.ai/v1/auth/manual/signup', {
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
        fetch('https://api.croboost.ai/v1/ab/tests/', {
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
        fetch('https://api.croboost.ai/v1/metrics/'+message.payload.record_id, {
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
        console.log(message.payload)
        fetch('https://api.croboost.ai/v1/ab/tests/'+message.payload.record_id, {
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
        fetch('http://localhost:3001/'+message.payload.aiOption, {
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
