import Guitar from './guitar'
export default function GuitarsList({guitars}) {
  return (
    <>
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
    </>
  )
}
