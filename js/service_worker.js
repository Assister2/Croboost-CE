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
                'Content-Type': 'application/json'
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
            console.log(res);
            senderResponse(res);
        })
    }
    return true
});
