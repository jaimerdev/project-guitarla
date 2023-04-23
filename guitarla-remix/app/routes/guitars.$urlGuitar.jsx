import { useState } from 'react'
import {useLoaderData, useOutletContext} from '@remix-run/react'
import {getGuitar} from '~/models/guitars.server'

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
function Guitar() {
  const {addToCart} = useOutletContext()
  const [amount, setAmount] = useState(0);
  const guitar = useLoaderData();
  const {name, description, image, price} = guitar.data[0].attributes
  const handleSubmit = e => {
    e.preventDefault();
    if(amount < 1) {
      alert('Selecciona una cantidad')
      return
    }
    const selectedGuitar = {
      id: guitar.data[0].id,
      image: image.data.attributes.url,
      name,
      price,
      amount
    }
    addToCart(selectedGuitar)
  }
  return (
    <div className='guitar'>
      <img  className='image' src={image.data.attributes.url} alt={`Imagen de la guitarra ${name}`} />
      <div className='content'>
        <h3>{name}</h3>
        <p className='text'>{description}</p>
        <p className='price'>${price}</p>
        <form onSubmit={handleSubmit} className='form'>
          <label htmlFor="amount">Cantidad</label>
          <select
            onChange={e => setAmount(parseInt(e.target.value))}
            id="amount"
          >
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input
            type="submit"
            value="Agregar al carrito"
          />
        </form>
      </div>
    </div>
  )
}
export default Guitar