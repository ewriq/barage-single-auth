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


module.exports = { encrypt, decrypt }