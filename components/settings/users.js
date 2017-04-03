import { Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

import { users } from '~/stores';
import UserList from '~/components/userList';

export default () => <UserList users={users} />;
