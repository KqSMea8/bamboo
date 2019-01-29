/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-29 14:30:25
 * @modify date 2019-01-29 14:30:25
 * @desc [tree2list and list2tree]
 */

function makeid(num) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < num; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function tree2list(tree, option) {
  const list = [];
  function traverse(_tree, _option = { idKey: 'id', parentKey: 'parent', childKey: 'children' }) {
    for (let i = 0; i < _tree.length; i += 1) {
      const node = _tree[i];
      if (node[_option.idKey] === undefined) {
        node[_option.idKey] = makeid(32);
      }
      const children = node[_option.childKey];
      delete node[_option.childKey];
      list.push(node);
      if (Array.isArray(children) && children.length > 0) {
        // eslint-disable-next-line no-param-reassign
        traverse(children.map(x => {
        // eslint-disable-next-line no-param-reassign
          x[_option.parentKey] = node[_option.idKey];
          return x;
        }), _option);
      }
    }
  }
  traverse(tree, option);
  return list;
}

export function list2tree(list, option = { idKey: 'id', parentKey: 'parent', childKey: 'children' }) {
  const map = {};
  const roots = [];
  for (let i = 0; i < list.length; i += 1) {
    map[list[i][option.idKey]] = i;
    // eslint-disable-next-line no-param-reassign
    list[i][option.childKey] = [];
  }
  for (let i = 0; i < list.length; i += 1) {
    const node = list[i];
    if (node[option.parentKey]) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node[option.parentKey]]][option.childKey].push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
