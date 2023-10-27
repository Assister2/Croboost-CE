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
                'Authorization': "Bearer "+ message.payload.access_token.access_token
            },
        }).then(res => {
            return res.json();
        }).then(res => {
            senderResponse(res);
        })
    }
    return true
});
