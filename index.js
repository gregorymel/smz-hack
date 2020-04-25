const express = require('express');
const { createPaymentLink } = require('./src/payment');
const bodyParser = require('body-parser');
const cors = require('cors');
const { uuid } = require('uuidv4');
const config = require('./configs');
const smz = require('./src/smz-api');

const app = express()
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.get('/get_status', async (req, res) => {
    const inn = req.body['inn'];

    const token = await smz.getAuthToken(config.username, config.password, config.clientId);
    if (token == undefined) {
        res.status(400);
    }

    const ruid = await smz.getStatus(token, inn);
    if (ruid == undefined) {
        res.status(400);
    }

    const payload = await smz.waitRequest(token, ruid);
    if (payload['code'] == "TAXPAYER_UNBOUND") {
        res.send("false");
    } else {
        res.send("true");
    }
});

app.post('/create_payment_link', async (req, res) => {
    const ruid = uuid();
    const pageParams = req.body['pageParams'];
    const price = req.body['price'];
    console.log(pageParams, price);

    const url = await createPaymentLink(config.siteId, ruid, pageParams, price);

    res.send(url);
});


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});