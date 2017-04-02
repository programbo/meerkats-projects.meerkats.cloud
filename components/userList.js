import React, { Component } from 'react';
import { observer } from 'mobx-react';

import User from '~/components/user';
import { users } from '~/stores';

export default observer(() => (
  <ul className="users">
    {users.values.length
      ? users.values.map(({ email }, index) => (
          <User email={email} key={index} />
        ))
      : <li className="no-users">No users</li>}
  </ul>
));
