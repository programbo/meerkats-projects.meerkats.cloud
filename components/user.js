import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ email }) => <li className="user">{email}</li>);
