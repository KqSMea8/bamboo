import CryptoJS from 'crypto-js';

const secret = 'U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy+bu0=';

export function encrypted(message) {
  return CryptoJS.AES.encrypt(message, secret).toString();
}

export function decrypted(message) {
  return CryptoJS.AES.decrypt(message, secret).toString(CryptoJS.enc.Utf8);
}
