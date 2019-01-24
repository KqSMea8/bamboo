/**
 * @author [double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-20 21:17:18
 * @modify date 2019-01-20 21:17:18
 * @desc [getIdentify and setIdentify]
 */

const IDENTIFY = 'IDENTIFY';
const store = localStorage;

function getItem(key) {
  try {
    return JSON.parse(store.getItem(key)) || {};
  } catch (e) {
    throw new Error('getItem Error:', e);
  }
}

function setItem(key, entity) {
  return store.setItem(key, JSON.stringify(entity));
}

export function getIdentify() {
  return getItem(IDENTIFY);
}

export function setIdentify(identify) {
  return setItem(IDENTIFY, JSON.stringify(identify));
}
