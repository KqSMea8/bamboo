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

const idKey = 'IDENTIFY';
const store = localStorage;

function randomString() {
  return Math.random()
    .toString(36)
    .substring(2);
}

let memoKey = randomString();

function getItem(key) {
  const item = store.getItem(key);
  const buffer = decrypted(item);
  const obj = JSON.parse(buffer) || {};
  return obj;
}

function setItem(key, entity) {
  const enc = encrypted(JSON.stringify(entity));
  return store.setItem(key, enc);
}

const memoizeOneFormatter = memoizeOne((mk, key) => getItem(key), isEqual);

export function getIdentify() {
  return memoizeOneFormatter(memoKey, idKey);
}

export function setIdentify(identify) {
  memoKey = randomString();
  return setItem(idKey, identify);
}

export function unsetIdentify() {
  return store.removeItem(idKey);
}
