/**
 * @author [double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-20 21:17:18
 * @modify date 2019-01-20 21:17:18
 * @desc [getAuthority]
 */

import store from './store';

// eslint-disable-next-line import/prefer-default-export
export function getAuthority(authority) {
  return store(state => authority || (state && state.global && state.global.permits));
}
