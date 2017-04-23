// import FontIcon from 'material-ui/FontIcon'
import { DefaultLayout } from '~/components/layout'
// import Todos from '~/components/todos'
// import blogs from '~/stores/blogs';
import { blogs } from '~/lib/firebase'

const Blog = ({ articles }) => (
  <DefaultLayout title="Blog">
    <h1>
      Blog
    </h1>
    {articles.map(({ title, content }, index) => (
      <div key={index}>
        <h2>{title}</h2>
        <h3>{content}</h3>
      </div>
    ))}
  </DefaultLayout>
)

Blog.getInitialProps = async () => {
  const articles = await blogs.child('/').once('value')
  const values = articles.val()
  return {
    articles: Object.keys(values).map(uid => ({ uid, ...values[uid] })),
  }
}

export default Blog
