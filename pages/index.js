import Link from 'next/link'
import { DefaultLayout } from '~/components/layout'

const Home = () => (
  <DefaultLayout title="Home">
    <Link prefetch href="/"><h1>Home</h1></Link>
    <Link prefetch href="/todo"><h1>Todo</h1></Link>
    <Link prefetch href="/blog"><h1>Blog</h1></Link>
    <Link prefetch href="/projects"><h1>Projects</h1></Link>
  </DefaultLayout>
)

export default Home
