import { DefaultLayout } from '~/components/layout'
import Todos from '~/components/todos'

const Todo = () => (
  <DefaultLayout title="Todo" secure>
    <h1>
      Todo
    </h1>
    <Todos />
  </DefaultLayout>
)

Todo.getInitialProps = async () => {
  return {}
}

export default Todo
