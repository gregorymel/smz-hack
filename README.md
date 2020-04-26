# smz-hack 
Api for SMZ and hashconnect

Run server locally```node index.js```

Server uses API mentioned below (see ```./src``` directory for more details): 

## API Reference
<details>
  <summary>smz.getStatus</summary>
<p>

#### smz.getStatus(authToken, userInn)

```js
const ruid = await smz.getStatus(token, inn);
```
- `token` String. The bearer access token for smz-api.
- `inn` String. Individual tax number of the user.

- Returns id of the request.

Get info about user using his individual tax number.
</p>
</details>
<details>
  <summary>smz.bindPartner</summary>
<p>
  
#### smz.bindPartner(authToken, userInn)

```js
const ruid = await bindPartner(token, inn);
```
- `token` String. The bearer access token for smz-api.
- `inn` String. Individual tax number of the user.

- Returns id of the request.

Bind user to the partner's app using user's individual tax number 
  
</p>
</details>
<details>
  <summary>smz.getAuthToken</summary>
<p>
  
#### smz.getAuthToken(username, password, clientId);

```js
const token = await smz.getAuthToken(username, password, clientId);
```
- `username` String. Partner app name.
- `clientId` String. It's equal to "smz".
- `password` String. Partner app password.


- Returns access token.


</p>
</details>
<details>
  <summary>smz.waitRequest</summary>
<p>
  
#### smz.waitRequest(token, ruid)

```js
const payloadStatus = await waitRequest(token, ruid);
```
- `token` String. The bearer access token for smz-api.
- `ruid` String. Unique request identifier.

- Returns response body

Wait for the reuest status change.


</p>
</details>
<details>
  <summary>hashconnect.createPaymentLink</summary>
<p>
  
#### hashconnect.createPaymentLink(siteId, ruid, pageParameters, price)

```js
const url = await createPaymentLink(siteId, ruid, pageParams, price);
```
- `siteId` String. Unique identifier (shoud be given by Hashconnect) 
- `pageParams` String. Links where user should be redirected from the payment page
- `price` String. Price of the deal
- `ruid` String. Unique request identifier.

- Returns payment link

Creates payment and returns url where user should redirected.
