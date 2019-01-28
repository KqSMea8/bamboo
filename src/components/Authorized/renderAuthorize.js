/* eslint-disable import/no-mutable-exports */
let CURRENT = 'NULL';
/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = Authorized => currentAuthority => {
  if (currentAuthority) {
    if (typeof currentAuthority === 'function') {
      CURRENT = currentAuthority();
    } else {
      CURRENT = currentAuthority;
    }
  }
  return Authorized;
};

export { CURRENT };
export default Authorized => renderAuthorize(Authorized);
