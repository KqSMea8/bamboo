/**
 * @author [Double]
 * @email [2637309949@mail.com]
 * @create date 2019-01-28 22:55:30
 * @modify date 2019-01-28 22:55:30
 * @desc [window store]
 */

export default function(select) {
  // eslint-disable-next-line no-underscore-dangle
  const store = window.g_app._store;
  if (store) {
    const state = store.getState();
    return select(state);
  }
  return null;
}

export function dispatch(action) {
  // eslint-disable-next-line no-underscore-dangle
  const store = window.g_app._store;
  if (store) {
    store.dispatch(action);
  }
}
