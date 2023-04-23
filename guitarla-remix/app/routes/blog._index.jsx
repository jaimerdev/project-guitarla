import {useLoaderData} from '@remix-run/react'
import {getPosts} from '~/models/posts.server'
import PostsList from '~/components/posts-list'

export function meta() {
  return [
    {
      title: 'GuitarLA - Nuestro Blog'
    },
    {
      description: 'GuitarLA, Blog de música y venta de guitarras'
    }
  ]
}
export async function loader() {
  const posts = await getPosts()
  return posts.data
}
function Blog() {
  const posts = useLoaderData()
  return (
    <PostsList
    posts={posts}
    />
  )
}
export default Blog