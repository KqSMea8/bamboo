/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-28 23:20:07
 * @modify date 2019-01-28 23:20:07
 * @desc [menu init]
 */

import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi/locale';
import Authorized from '@/utils/Authorized';
import { menu } from '../defaultSettings';
import { list2tree } from '../utils/tree';

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }
      let locale = 'menu';
      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }
      // if enableMenuLocale use item.name,
      // close menu international
      const name = menu.disableLocal
        ? item.name
        : formatMessage({ id: locale, defaultMessage: item.name });
      const result = { ...item, name, locale, authority: item.authority || parentAuthority };
      if (item.children && item.children.length > 0) {
        result.children = formatter(item.children, result.authority, locale);
      } else {
        delete result.children;
      }
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    // eslint-disable-next-line no-use-before-define
    return { ...item, children: filterMenuData(item.children) };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => Authorized.check(item.authority, getSubMenu(item)))
    .filter(item => item);
};

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  const routerMap = {};
  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default {
  namespace: 'menu',
  state: {
    menuRaw: [], // for check or get authority from intact menuData
    menuData: [], // for authority menu rendering from authority menuData
    breadcrumbNameMap: {},
  },
  reducers: {
    save(state, { payload: menuList }) {
      const routes = list2tree(menuList);
      const menuRaw = memoizeOneFormatter(routes, null);
      const menuData = filterMenuData(memoizeOneFormatter(routes, null));
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuData);
      return {
        ...state,
        menuRaw,
        menuData,
        breadcrumbNameMap,
      };
    },
  },
};
