import React from 'react';

import Layout from '~/components/layout';
import UserList from '~/components/userList';
import { users } from '~/stores';

export default () => (
  <Layout title="All Projects">
    <UserList users={users} />
  </Layout>
);
