/**
 * @author [double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-20 21:17:18
 * @modify date 2019-01-20 21:17:18
 * @desc [getAuthority and setAuthority]
 */

function select(state) {
  return state.global && state.global.permits;
}

export function getAuthority() {
  let permits = [];
  // eslint-disable-next-line no-underscore-dangle
  const store = window.g_app._store;
  if (store) {
    permits = select(store.getState()).roles;
  }
  return permits;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
