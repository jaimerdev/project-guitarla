import {useLoaderData} from '@remix-run/react'
import {getGuitar} from '~/models/guitars.server'
import styles from '~/styles/guitars.css'

export async function loader({params}) {
  const {urlGuitar} = params
  const guitar = await getGuitar(urlGuitar)
  if(guitar.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra no encontrada'
    })
  }
  return guitar
}
export function meta({data}) {
  if(!data) {
    return [
      {
        title: 'GuitarLA - Guitarra no encontrada'
      },
      {
        description: 'Guitarras, venta de guitarras, guitarra no encontrada'
      }
    ]
  }
  return [
    {
      title: `GuitarLA - ${data.data[0].attributes.name}`
    },
    {
      description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.name}`
    }
  ]
}
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}
function Guitar() {
  const guitar = useLoaderData();
  console.log(guitar.data[0])
  const {name, description, image, price} = guitar.data[0].attributes
  return (
    <main className='container guitar'>
      <img  className='image' src={image.data.attributes.url} alt={`Imagen de la guitarra ${name}`} />
      <div className='content'>
        <h3>{name}</h3>
        <p className='text'>{description}</p>
        <p className='price'>${price}</p>
      </div>
    </main>
  )
}
export default Guitar