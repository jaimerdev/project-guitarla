import {useLoaderData} from '@remix-run/react'
import {getGuitars} from '~/models/guitars.server'
import GuitarsList from '../components/guitars-list'

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
export async function loader() {
  const guitars = await getGuitars();
  return guitars.data;
}

function Store() {
  const guitars = useLoaderData();
  return (
    <GuitarsList
    guitars={guitars}
    />
  )
}

export default Store