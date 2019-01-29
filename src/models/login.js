/**
 * @author [double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-20 21:17:18
 * @modify date 2019-01-20 21:17:18
 * @desc [user login and init initState]
 */
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import {
  obtainToken, getFakeCaptcha, getPermits, getMenuData, getIdentity,
} from '@/services/api';
import { setIdentify, unsetIdentify } from '@/utils/identify';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    * login({ payload }, { call, put }) {
      const token = yield call(obtainToken, payload);
      // Login successfully
      if (token) {
        // ***********************************************
        // System setup base data for other components
        // Save identify
        setIdentify(token);
        const identify = yield call(getIdentity);
        const permits = yield call(getPermits);
        yield put({ type: 'global/setIdentity', payload: identify });
        yield put({ type: 'global/setPermits', payload: permits });
        // Reload Authorized
        reloadAuthorized();
        // System setup base data for other components end
        // ***********************************************
        const menuList = yield call(getMenuData);
        yield put({ type: 'menu/save', payload: menuList });
        // Redirect to comefrom page
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    * getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    * logout(_, { put }) {
      unsetIdentify();
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        }),
      );
    },
  },
};
