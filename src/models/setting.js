/**
 * @author [double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-20 21:53:04
 * @modify date 2019-01-20 21:53:04
 * @desc [ui and stype setting]
 */

import { message } from 'antd';
import defaultSettings from '../defaultSettings';

let lessNodesAppended;
const updateTheme = primaryColor => {
  // Don't compile less in production!
  if (APP_TYPE !== 'site') {
    return;
  }
  // Determine if the component is remounted
  if (!primaryColor) {
    return;
  }

  function buildIt() {
    // For brower reload and reload less.js
    // Less.js onload but may not be executed finished now!, delay update css vars
    if (!window.less || window.less.javascriptNotExecuted) {
      return;
    }
    const hideMessage = message.loading('正在编译主题！', 0);
    setTimeout(() => {
      try {
        window.less
          .modifyVars({
            '@primary-color': primaryColor,
          })
          .then(() => {
            hideMessage();
          })
          .catch(() => {
            message.error('Failed to update theme');
            hideMessage();
          });
      } catch (error) {
        // Ensure less function is existsed and ok, otherwise hide message.
        hideMessage();
        throw error;
      }
    }, 200);
  }
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link');
    const lessConfigNode = document.createElement('script');
    const lessScriptNode = document.createElement('script');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    lessStyleNode.setAttribute('href', '/color.less');
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true,
        javascriptNotExecuted: true,
      };
    `;
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';
    lessScriptNode.async = true;
    lessScriptNode.onload = () => {
      buildIt();
      lessScriptNode.onload = null;
    };
    document.body.appendChild(lessStyleNode);
    document.body.appendChild(lessConfigNode);
    document.body.appendChild(lessScriptNode);
    lessNodesAppended = true;
  } else {
    buildIt();
  }
};

const updateColorWeak = colorWeak => {
  document.body.className = colorWeak ? 'colorWeak' : '';
};

export default {
  namespace: 'setting',
  state: defaultSettings,
  reducers: {
    getSetting(state) {
      const setting = {};
      const urlParams = new URL(window.location.href);
      Object.keys(state).forEach(key => {
        if (urlParams.searchParams.has(key)) {
          const value = urlParams.searchParams.get(key);
          setting[key] = value === '1' ? true : value;
        }
      });
      const { primaryColor, colorWeak } = setting;
      if (state.primaryColor !== primaryColor) {
        updateTheme(primaryColor);
      }
      updateColorWeak(colorWeak);
      return {
        ...state,
        ...setting,
      };
    },
    changeSetting(state, { payload }) {
      const urlParams = new URL(window.location.href);
      Object.keys(defaultSettings).forEach(key => {
        if (urlParams.searchParams.has(key)) {
          urlParams.searchParams.delete(key);
        }
      });
      Object.keys(payload).forEach(key => {
        if (key === 'collapse') {
          return;
        }
        let value = payload[key];
        if (value === true) {
          value = 1;
        }
        if (defaultSettings[key] !== value) {
          urlParams.searchParams.set(key, value);
        }
      });
      const { primaryColor, colorWeak, contentWidth } = payload;
      if (state.primaryColor !== primaryColor) {
        updateTheme(primaryColor);
      }
      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(colorWeak);
      window.history.replaceState(null, 'setting', urlParams.href);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
