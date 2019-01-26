import { queryNotices, getIdentity, getPermits, getMenuData } from '@/services/api';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
    permits: {},
    loadedAllNotices: false,
  },
  effects: {
    *query(_, { call, put }) {
      const identify = yield call(getIdentity);
      const permits = yield call(getPermits);
      yield put({
        type: 'setIdentity',
        payload: identify,
      });
      yield put({
        type: 'setPermits',
        payload: permits,
      });
      reloadAuthorized();
      const menuList = yield call(getMenuData);
      yield put({
        type: 'menu/save',
        payload: menuList,
      });
    },
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      const loadedAllNotices = data && data.length && data[data.length - 1] === null;
      yield put({
        type: 'setLoadedStatus',
        payload: loadedAllNotices,
      });
      yield put({
        type: 'saveNotices',
        payload: data.filter(item => item),
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *fetchMoreNotices({ payload }, { call, put, select }) {
      const data = yield call(queryNotices, payload);
      const loadedAllNotices = data && data.length && data[data.length - 1] === null;
      yield put({
        type: 'setLoadedStatus',
        payload: loadedAllNotices,
      });
      yield put({
        type: 'pushNotices',
        payload: data.filter(item => item),
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        })
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },

  reducers: {
    setIdentity(state, { payload }) {
      return {
        ...state,
        identity: payload,
      };
    },
    setPermits(state, { payload }) {
      return {
        ...state,
        permits: payload,
      };
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    pushNotices(state, { payload }) {
      return {
        ...state,
        notices: [...state.notices, ...payload],
      };
    },
    setLoadedStatus(state, { payload }) {
      return {
        ...state,
        loadedAllNotices: payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // Init global state once after brower reload
      if (history.location.pathname.indexOf('/login') === -1) {
        dispatch({ type: 'query' });
      }
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
