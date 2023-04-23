import {useEffect, useState} from 'react'
import {useOutletContext} from '@remix-run/react'
import {ClientOnly} from 'remix-utils'
import styles from '~/styles/cart.css'

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}
export function meta() {
    return [
        {
            title: 'GuitarLA - Carrito de Compras'
        },
        {
            description: 'Venta de Guitarras, música, blog, carrito de compras, tienda'
        }
    ]
}
export default function Cart() {
    const [total, setTotal] = useState(0)
    const {cart, updateAmount, deleteGuitar} = useOutletContext()
    useEffect(() => {
        const totalCalculation = cart.reduce((total, product) => total + (product.amount * product.price), 0)
        setTotal(totalCalculation)
    }, [cart])
    return (
        <ClientOnly fallback={'cargando...'}>
            {() => (
            <main className="container">
                <h1 className="heading">Carrito de Compras</h1>
                <div className="content">
                    <div className='cart'>
                        <h2>Artículos</h2>
                        {cart?.length === 0 ? 'Carrito Vacío' : (
                            cart?.map(product => (
                                <div key={product.id} className='product'>
                                    <div>
                                        <img src={product.image} alt={`Imagen del producto ${product.image}`} />
                                    </div>
                                    <div>
                                        <p className='name'>{product.name}</p>
                                        <p>Cantidad:</p>
                                        <select
                                            value={product.amount}
                                            className='select'
                                            onChange={e => updateAmount({
                                                amount: +e.target.value,
                                                id: product.id
                                            })}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <p className='price'>$ <span>{product.price}</span></p>
                                        <p className='subtotal'>Subtotal: $ <span>{product.amount * product.price}</span></p>
                                    </div>
                                    <button
                                        type='button'
                                        className='btn_delete'
                                        onClick={() => deleteGuitar(product.id)}
                                    >X</button>
                                </div>
                            ))
                        )}
                    </div>
                    <aside  className="summary">
                        <h3>Resumen del Pedido</h3>
                        <p>Total a pagar: ${total}</p>
                    </aside>
                </div>
            </main>
            )}
        </ClientOnly>
    )
}
