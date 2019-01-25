/**
 * @author [double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-20 21:17:18
 * @modify date 2019-01-20 21:17:18
 * @desc [getIdentify and setIdentify]
 */

import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { encrypted, decrypted } from './crypto';

const IDENTIFY = 'IDENTIFY';
const store = localStorage;

let memoKey = Math.random()
  .toString(36)
  .substring(2);

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

const memoizeOneFormatter = memoizeOne((mk, key) => getItem(key), isEqual);

function setItem(key, entity) {
  const enc = encrypted(JSON.stringify(entity));
  return store.setItem(key, enc);
}

export function getIdentify() {
  return memoizeOneFormatter(memoKey, IDENTIFY);
}

export function setIdentify(identify) {
  memoKey = Math.random()
    .toString(36)
    .substring(2);
  return setItem(IDENTIFY, identify);
}

export function unsetIdentify() {
  return store.removeItem(IDENTIFY);
}
