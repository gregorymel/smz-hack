const fetch = require('node-fetch');
const { uuid } = require('uuidv4');
const config = require('../configs.js');

const inn = "741524015385";

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms)
    });
}

async function waitRequest(token, ruid, repeat=100) {
    for (let i = 0; i < repeat; i++) { 
        let res = await getRequestStatus(token, ruid);
        if (res) {
            const state = res["state"];
            console.log(state);
            if (state !== "Created" && state != "Pending") {
                return await res["payload"];
            }
        }

        await delay(1000);
    }

    return undefined;
}

async function getAuthToken(username, password, client_id) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    urlencoded.append("grant_type", "password");
    urlencoded.append("client_id", client_id);

    var requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };


    let response = await fetch("https://ktir.smz.w1.money/api/token/", requestOptions);
    if (response.ok) {
        response = await response.json();
        const authToken = response["access_token"];

        // console.log(authToken);

        return "Bearer " + authToken;
    }

    return undefined;
}

async function getStatus(authToken, userInn) {
    var myHeaders = {
        "Authorization": authToken,
        "Content-Type": "application/json"
    };

    var raw = JSON.stringify({"inn": userInn});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const requestId = uuid();
    var res = await fetch(`https://ktir.smz.w1.money/api/smz/getTaxpayerStatusRequest?externalId=${requestId}`, requestOptions);

    if (res.ok) {
        return requestId;
    }

    return undefined;
}

async function bindPartner(authToken, userInn) {
    var myHeaders = {
        "Authorization": authToken,
        "Content-Type": "application/json"
    };
    
    var raw = JSON.stringify({
        "inn": userInn, 
        "permissions": [
            "INCOME_REGISTRATION",
            "PAYMENT_INFORMATION",
            "INCOME_LIST",
            "INCOME_SUMMARY",
            "CANCEL_INCOME"
        ]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const ruid = uuid();
    const res = await fetch(`https://ktir.smz.w1.money/api/smz/postBindPartnerWithInnRequest?externalId=${ruid}`, requestOptions);

    if (res.ok) {
        return ruid;
    }

    return undefined;
}

async function getPermissionList() {
    var myHeaders = {
        "Authorization": authToken,
        "Content-Type": "application/json"
    };

    var raw = JSON.stringify({"inn":"<string>"});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const ruid = uuid();
    const res = await fetch(`https://ktir.smz.w1.money/api/smz/getGrantedPermissionsRequest?externalId=${ruid}`, requestOptions)

    console.log(await res.text());
}

async function getRequestStatus(token, ruid) {
    var myHeaders = {
        "Authorization": token
    };

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const res = await fetch(`https://ktir.smz.w1.money/api/smz/getResponse?externalId=${ruid}`, requestOptions)

    if (res.ok) {
        return await res.json();
    }

    return undefined;
}


// async function main() {
//     const token = await getAuthToken(config.username, config.password, config.clientId);
//     // const ruid = await getStatus(token, inn);
//     // const ruid = await bindPartner(token, inn);
//     // const payload = await waitRequest(token, ruid);
//     // console.log(payload);
//     const ruidStatus = await getStatus(token, inn);
//     const payloadStatus = await waitRequest(token, ruidStatus);
//     console.log(payloadStatus);
// }


// main()
//     .catch(err => console.log(err));

module.exports = {
    getAuthToken,
    waitRequest,
    bindPartner,
    getStatus
}