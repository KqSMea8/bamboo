/**
 * @author [double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-20 21:17:18
 * @modify date 2019-01-20 21:17:18
 * @desc [getIdentify and setIdentify]
 */

import { encrypted, decrypted } from './crypto';

const IDENTIFY = 'IDENTIFY';
const store = localStorage;

function getItem(key) {
  try {
    const raw = store.getItem(key);

    if (!raw) {
      return {};
    }
    const dec = decrypted(raw);
    return JSON.parse(dec) || {};
  } catch (e) {
    return {};
  }
}

function setItem(key, entity) {
  const enc = encrypted(JSON.stringify(entity));
  return store.setItem(key, enc);
}

export function getIdentify() {
  return getItem(IDENTIFY);
}

export function setIdentify(identify) {
  return setItem(IDENTIFY, identify);
}

export function unsetIdentify() {
  return store.removeItem(IDENTIFY);
}
