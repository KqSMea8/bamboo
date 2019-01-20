/**
 * @author [double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-20 20:58:34
 * @modify date 2019-01-20 20:58:34
 * @desc [menu layout]
 */

//
// 1.用户菜单继承默认菜单
// 2.用户菜单是拷贝方式继承，修改时不会改默认菜单
// 3.用户新增菜单时需要检测默认菜单项是否存在，存在则用copy默认菜单项并覆盖（通常是权限，权限不能在用户端控制，而是以继承的方式实现）
// 3.默认菜单的修改会影响用户菜单，比如菜单权限的调整，菜单的新增（这个操作由默认端（admin）发起，admin手动更新机制）
// 4.默认菜单是所有菜单
// 5.（admin）默认菜单新增时，需要同步用户菜单（这个操作由用户端发起，用户自动更新机制）

import { createContext } from 'react';

export default createContext();
