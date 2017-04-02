import React from 'react';
import { observer } from 'mobx-react';

import { currentUser } from '~/stores';

export default observer(() => (
  <div className="current-user">
    Current user: {currentUser.profile && JSON.stringify(currentUser.profile)}
  </div>
));
