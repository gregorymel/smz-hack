const fs = require('fs')

module.exports = {
    username: "startblock",
    password: "4ae72f92-b19c-43f2-bb2f-608723c52614",
    clientId: "smz-api",
    paymentUrl: "https://payment.hashconnect.eu",
    siteId: "1-1",
    privateKey: fs.readFileSync('private_key.pem'),
    callbackUrl: "http://localhost:65456/callback"
}

// const inn = "741524015385";