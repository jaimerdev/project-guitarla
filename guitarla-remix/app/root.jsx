import {useState, useEffect} from 'react'
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useRouteError,
    isRouteErrorResponse,
    Link
} from '@remix-run/react'
import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'

export function meta() {
    return [
        {
            charset: 'utf-8',
        },
        {
            title: 'GuitarLA - Remix',
        },
        {
            viewport: 'width=device-width,initial-scale=1'
        }
    ]
}
export function links() {
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'true'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export default function App() {
    const cartLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) ?? [] : null
    const [cart, setCart] = useState(cartLS)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    const addToCart = guitar => {
        if(cart.some(guitarState => guitarState.id === guitar.id)) {
            //Iterar sobre el arreglo, e identificar el elemento duplicado
            const updatedCart = cart.map(guitarState => {
                if(guitarState.id === guitar.id) {
                    //Reescribir la cantidad
                    guitarState.amount = guitar.amount
                }
                return guitarState
            })
            //Añadir al carrito
            setCart(updatedCart)
        } else {
            //No existe un producto igual, por lo tanto...
            setCart([...cart, guitar])
        }
    }
    const updateAmount = guitar => {
        const updatedCart = cart.map(guitarState => {
            if(guitarState.id === guitar.id) {
                guitarState.amount = guitar.amount
            }
            return guitarState
        })
        setCart(updatedCart)
    }
    const deleteGuitar = id => {
        const updatedCart = cart.filter(guitarState => guitarState.id !== id)
        setCart(updatedCart)
    }
    return(
        <Document>
            <Outlet
                context={{
                    addToCart,
                    cart,
                    updateAmount,
                    deleteGuitar
                }}
            />
        </Document>
    )
}

function Document({children}) {
    return (
        <html lang='es'>
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

/** Manejo de errores **/
export function ErrorBoundary() {
    const error = useRouteError();
    if(isRouteErrorResponse(error)){
        return (
            <Document>
                <p className='error'>{error.status} {error.statusText}</p>
                <Link className='error-link' to='/'>Tal vez quieras volver a la página principal</Link>
            </Document>
        )
    }
    return (
        <Document>
                <p className='error'>{error.status} {error.statusText}</p>
                <Link className='error-link' to='/'>Tal vez quieras volver a la página principal</Link>
        </Document>
    )
}

//https://remix.run/docs/en/1.15.0/pages/v2#catchboundary-and-errorboundary