/**
 * @author [double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-20 21:17:18
 * @modify date 2019-01-20 21:17:18
 * @desc [getAuthority]
 */

import CryptoJS from 'crypto-js';

const { AES } = CryptoJS;
const secret = 'U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy+bu0=';

export function encrypted(message) {
  return AES.encrypt(message, secret).toString();
}

export function decrypted(message) {
  if (message) {
    return AES.decrypt(message, secret).toString(CryptoJS.enc.Utf8);
  }
  return null;
}
