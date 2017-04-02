import React from 'react';
import { observer } from 'mobx-react';

import { currentUser } from '~/stores';

export default observer(() => (
  <h1 className="current-user">
    Current user: {currentUser.profile && JSON.stringify(currentUser.profile)}
  </h1>
));
