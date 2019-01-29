/**
 * @author [double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-20 21:17:18
 * @modify date 2019-01-20 21:17:18
 * @desc [Authorized Host after init initState, must subscription `global/query` for permts store in global status]
 */
import React from 'react';
import { connect } from 'dva';
import RenderAuthorized from '@/components/Authorized';
import PageLoading from '@/components/PageLoading';
import { getAuthority } from '@/utils/authority';
import Redirect from 'umi/redirect';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);

const AuthorizedHost = ({ querying, children }) => (querying ? (
  <PageLoading />
) : (
  <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
    {children}
  </Authorized>
));
export default connect(({ loading }) => ({ querying: loading.effects['global/query'] }))(
  AuthorizedHost,
);
