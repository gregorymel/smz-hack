const crypto = require('crypto');
const fetch = require('node-fetch');
const config = require('../configs');
const { uuid } = require('uuidv4');

function createSignature(method, uri, data) {
    const sign = crypto.createSign('SHA256');

    const dataToSign = `${method}\n${uri}\n${data}`;
    sign.write(dataToSign);
    sign.end();

    const signature = sign.sign(config.privateKey, 'base64');

    return signature;
}

async function createPaymentLink(siteId, ruid, pageParameters, price) {
  var body = {
      "action": "purchase",
      "amount" : {
        "amount" : price,
        "currency" : "RUB"
      },
      "externalId" : `${ruid}`,
      "merchantParameters" : {
        "param1" : "1",
        "param2" : "2",
        "param3" : "3"
      },
      "notification" : {
        "url" : "http://localhost:65456/callback",
        "version" : 1
      },
      "pageParameters": pageParameters,
      "registerRecurring" : false
  }

  var raw = JSON.stringify(body);

  const uri = `/paymentpageapi/${siteId}/create_payment_link`;

  var myHeaders = {
      "W1-Signature": createSignature('POST', uri, raw),
      "Content-Type": "application/json"
  };

  var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: myHeaders,
      body: raw,
  };

  const url = `${config.paymentUrl}${uri}`;
  var res = await fetch(url, requestOptions);

  console.log(res.status);

  if (res.ok) {
    res = await res.json();

    console.log(res);
    
    return res['url'];
  }

  return undefined;
}


// const ruid = uuid();
// console.log(ruid);

// createPaymentLink(config.siteId, ruid);
// // purchase(config.siteId);

module.exports = {
  createPaymentLink
}