# Single-User Auth Barage App

**I used aes + base64 to encrypt the username and passcode because I thought this made it difficult to decrypt. I created the token using the new key (hash key) + username + password from the data in our configuration file. With a logic like on the web, I saved the token in a sql file as if I saved it in a cookie, we send it to the server by pulling it from there and the server decodes the token, verifies it after decoding it and does the operation we want.**


- **Install Package**

```shell
$ npm i barage 
```

- **Start Command** 

```shell
npm run client
```

```bash
npm run server
```

### Aes Encrypt and Decrypted

```js
const CryptoJS = require('crypto-js');

function encrypt(text, key) {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
  return { iv: iv.toString(CryptoJS.enc.Hex), encryptedText: encrypted.toString() };
}

function decrypt(encryptedData, key) {
  const iv = CryptoJS.enc.Hex.parse(encryptedData.iv);
  const decrypted = CryptoJS.AES.decrypt(encryptedData.encryptedText, key, { iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

```


Developer ewriq 💙