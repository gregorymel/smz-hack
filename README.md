# smz-hack 
Api for SMZ and hashconnect

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
  <summary>smz.bindPartner</summary>
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
