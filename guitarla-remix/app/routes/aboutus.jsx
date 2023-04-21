import image from '../../public/img/nosotros.jpg'
import styles from '~/styles/aboutus.css'

export function meta() {
  return [
    {
    title: 'GuitarLA - Sobre Nosotros'
    },
    {
    description: 'Venta de guitarras, blog de música'
    }
  ]
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: image,
      as: 'image'
    }
  ]
}

function Aboutus() {
  return (
    <main className="container aboutus">
      <h2 className="heading">Nosotros</h2>
      <div className="content">
        <img src={image} alt="Imagen de una guitarra" />
        <div>
          <p>Donec laoreet tellus sit amet vehicula hendrerit. Fusce fermentum sagittis tortor sit amet placerat. Sed dapibus justo arcu, at dignissim erat rutrum ut. Vivamus eleifend velit vitae urna placerat dictum. Etiam faucibus facilisis dapibus. Ut sed eleifend dolor, ac cursus turpis. Curabitur vitae tellus a dolor tincidunt facilisis nec vel ligula.</p>
          <p>Nunc vehicula mi a rutrum scelerisque. Fusce vel massa vehicula, iaculis elit ac, ullamcorper libero. Vivamus a accumsan augue, eu pretium arcu. Morbi commodo, ante sed pharetra tristique, dolor felis feugiat arcu, id rutrum est dui sed libero. Duis mollis maximus vestibulum. Ut porttitor semper mauris ut cursus. Nullam et enim eget risus porta pellentesque eu sit amet augue. Pellentesque vulputate risus ut lectus luctus, vitae hendrerit sapien aliquet.</p>
        </div>
      </div>
    </main>
  )
}

export default Aboutus