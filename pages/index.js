import FontIcon from 'material-ui/FontIcon'
import { DefaultLayout } from '~/components/layout'
import Todos from '~/components/todos'
export default () => (
  <DefaultLayout title="All Projects">
    <h1>
      <FontIcon className="fa fa-check-square-o" /> Todo
    </h1>
    <Todos />
  </DefaultLayout>
)
