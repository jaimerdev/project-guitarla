import {useLoaderData} from '@remix-run/react'
import {getPost} from '~/models/posts.server.js'
import {formatDate} from '~/utils/helpers'

export function meta({data}) {
  if(!data) {
    return [
      {
        title: 'GuitarLA - Entrada no encontrada'
      },
      {
        description: 'GuitarLA, Blog de música y venta de guitarras, entrada no encontrada'
      }
    ]
  }
  return [
    {
      title: `GuitarLA - ${data.data[0].attributes.title}`
    },
    {
      description: `Guitarras, venta de guitarras, entrada ${data.data[0].attributes.title}`
    }
  ]
}
export async function loader({params}) {
    const {urlPost} = params
    const post = await getPost(urlPost)
    if(post.data.length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'Entrada no encontrada'
        })
    }
    return post;
}

export default function Post() {
  const post = useLoaderData()
  const {title, content, image, publishedAt} = post?.data[0]?.attributes
  return (
    <article className='post mt-3'>
      <img className="image" src={image?.data?.attributes?.url} alt={`image blog ${title}`} />
        <div className="content">
            <h3>{title}</h3>
            <p className="date">{formatDate(publishedAt)}</p>
            <p className="text">{content}</p>
        </div>
    </article>
  )
}
