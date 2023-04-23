import {Link, useLocation} from '@remix-run/react'
import image from '../../public/img/cart.png'

function Navigation() {
    const location = useLocation();
    return (
        <nav className="navigation">
            <Link
                to='/'
                className={location.pathname === '/' ? 'active' : ''}
            >Inicio</Link>
            <Link
                to='/aboutus'
                className={location.pathname === '/aboutus' ? 'active' : ''}
            >Nosotros</Link>
            <Link
                to='/guitars'
                className={location.pathname === '/guitars' ? 'active' : ''}
            >Tienda</Link>
            <Link
                to='/blog'
                className={location.pathname === '/blog' ? 'active' : ''}
            >Blog</Link>
            <Link
                to='/cart'
            >
                <img src={image} alt='Carrito de compras' />
            </Link>
        </nav>
    )
}

export default Navigation