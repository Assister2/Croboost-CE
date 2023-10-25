chrome.runtime.onMessage.addListener(function (message, sender, senderResponse) {
    if (message.message === "login") {
        fetch('https://api.croboost.ai/v1/auth/manual/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: sender.email, password: sender.password})
        }).then(res => {
            return res.json();
        }).then(res => {
            senderResponse(res);
        })
    }
    return true
});