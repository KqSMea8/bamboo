import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from './authority';

// eslint-disable-next-line import/no-mutable-exports
let Authorized = RenderAuthorized(getAuthority());

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default Authorized;
