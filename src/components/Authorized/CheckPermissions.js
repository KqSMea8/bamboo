/**
 * @author [double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-20 15:02:52
 * @modify date 2019-01-20 15:02:52
 * @desc [checkPermissions, currently only check role, but not permissions]
 */
import React from 'react';
import PromiseRender from './PromiseRender';
import { CURRENT } from './renderAuthorize';

function isPromise(obj) {
  return (
    !!obj
    && (typeof obj === 'object' || typeof obj === 'function')
    && typeof obj.then === 'function'
  );
}

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
function checkPermissions(authority, currentAuthority, target, Exception) {
  if (!authority) {
    return target;
  }
  if (authority && !currentAuthority) {
    return Exception;
  }

  if (typeof authority === 'string') {
    // eslint-disable-next-line no-param-reassign
    authority = authority
      .split(';')
      .filter(rp => rp)
      .map(rp => {
        const splites = rp.split('@');
        if (splites.length === 1) {
          return {
            roles: splites[0]
              .split(',')
              .map(x => x.trim())
              .filter(x => x),
            permits: [],
          };
        }
        return {
          roles: splites[0]
            .split(',')
            .map(x => x.trim())
            .filter(x => x),
          permits: splites[1]
            .split(',')
            .map(x => x.trim())
            .filter(x => x),
        };
      });
  }

  if (Array.isArray(currentAuthority)) {
    // eslint-disable-next-line no-param-reassign
    currentAuthority = currentAuthority.join(',');
  }

  if (typeof currentAuthority === 'string') {
    const splites = currentAuthority.split('@');
    if (splites.length === 1) {
      // eslint-disable-next-line no-param-reassign
      currentAuthority = {
        roles: splites[0]
          .split(',')
          .map(x => x.trim())
          .filter(x => x),
        permits: [],
      };
    } else {
      // eslint-disable-next-line no-param-reassign
      currentAuthority = {
        roles: splites[0]
          .split(',')
          .map(x => x.trim())
          .filter(x => x),
        permits: splites[1]
          .split(',')
          .map(x => x.trim())
          .filter(x => x),
      };
    }
  }

  if (Array.isArray(authority)) {
    // eslint-disable-next-line no-param-reassign
    authority = authority.map(rp => {
      if (typeof rp === 'string') {
        const splites = rp.split('@');
        if (splites.length === 1) {
          return {
            roles: splites[0]
              .split(',')
              .map(x => x.trim())
              .filter(x => x),
            permits: [],
          };
        }
        return {
          roles: splites[0]
            .split(',')
            .map(x => x.trim())
            .filter(x => x),
          permits: splites[1]
            .split(',')
            .map(x => x.trim())
            .filter(x => x),
        };
      }
      return rp;
    });
  }

  // Promise 处理
  if (isPromise(authority)) {
    return <PromiseRender ok={target} error={Exception} promise={authority} />;
  }

  if (typeof authority === 'function') {
    const ret = authority(currentAuthority);
    if (isPromise(ret)) {
      return <PromiseRender ok={target} error={Exception} promise={ret} />;
    }
    return target;
  }

  if (
    !(
      (Array.isArray(authority) || typeof authority === 'function')
      && typeof currentAuthority === 'object'
    )
  ) {
    return Exception;
  }

  // eslint-disable-next-line no-param-reassign
  authority = authority.map(x => ({
    roles: x.roles || [],
    permits: x.permits || [],
  }));

  // eslint-disable-next-line no-param-reassign
  currentAuthority = {
    roles: currentAuthority.roles || [],
    permits: currentAuthority.permits || [],
  };

  for (let i = 0; i < authority.length; i += 1) {
    const rp = authority[i];
    const rolesExisted = rp.roles.reduce((acc, curr) => {
      const exited = !!currentAuthority.roles.find(x => x === curr);
      return exited && acc;
    }, true);
    const allRolesExisted = currentAuthority.roles.find(x => x.toUpperCase() === 'ALL');

    const permitsExisted = rp.permits.reduce((acc, curr) => {
      const exited = !!currentAuthority.permits.find(x => x === curr);
      return exited && acc;
    }, true);
    const allPermitsExisted = currentAuthority.permits.find(x => x.toUpperCase() === 'ALL');

    // allRolesExisted && allPermitsExisted === admin
    const existed = (allRolesExisted && allPermitsExisted)
      || (rolesExisted && permitsExisted)
      || (allRolesExisted && permitsExisted)
      || (rolesExisted && allPermitsExisted);
    if (existed) {
      return target;
    }
  }
  return Exception;
}

export { checkPermissions };

const check = (authority, target, Exception) => checkPermissions(authority, CURRENT, target, Exception);
export default check;
