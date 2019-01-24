## Part I. Template Primer
[Ant Design Pro 2.0.0](https://github.com/ant-design/ant-design-pro)

## Part II. Template Characteristic

#### 认证设计原则
1. 用户登录认证获取令牌

2. 保存令牌作为全局REQ的携带信息

3. 获取用户角色，作为渲染路由菜单前提

4. 刷新权限入口规则

5. 跳转登录后界面

6. 获取认证信息以及其他global初始化

#### 权限设计原则

#### 菜单设计原则
1. 用户菜单继承默认菜单

2. 用户菜单是拷贝方式继承，修改时不会改默认菜单

3. 用户新增菜单时需要检测默认菜单项是否存在，存在则用默认菜单覆盖（通常是权限）

3. 默认菜单的修改会影响用户菜单，比如菜单权限的调整，菜单的新增

4. 默认菜单是所有菜单

5. （admin）默认菜单新增时，需要同步用户菜单（这个操作由用户端发起，自动更新机制）

---
Copyright (c) 2018-2020 Double

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
