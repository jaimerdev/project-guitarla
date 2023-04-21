import {useLoaderData} from '@remix-run/react'
import {getGuitars} from '~/models/guitars.server'
import Guitar from '~/components/guitar'
import styles from '~/styles/guitars.css'

export function meta() {
  return [
    {
      title: 'GuitarLA - Tienda de Guitarras'
    },
    {
      description: 'GuitarLA - Nuestra colección de guitarras'
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

export async function loader() {
  const guitars = await getGuitars();
  return guitars.data;
}

function Store() {
  const guitars = useLoaderData();
  return (
    <main className='container'>
      <h2 className='heading'>Nuestra Colección</h2>
      {guitars?.length && (
        <div className='guitars-grid'>
          {guitars.map(guitar => (
            <Guitar
              key={guitar?.id}
              guitar={guitar?.attributes}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Store