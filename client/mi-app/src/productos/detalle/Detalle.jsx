import './detalle.css'


export default function DetallePage({producto, volver}){
  const API_BASE = 'http://localhost:3000'
  const imagenPath = producto.imagen
    ? producto.imagen.match(/^https?:\/\//i)
      ? producto.imagen
      : `${API_BASE}/${encodeURI(producto.imagen)}`
    : null


    return(
        <>
        <div className="Detalle">
            <button className='btnVolver' onClick={volver} title="Volver">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{verticalAlign: 'middle', marginRight: '0px'}}>
                <path d="M12 5L6 11L12 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg></button>
            <div className="imagen">
            {imagenPath && (
                <img src={imagenPath} alt={producto.nombre} className="card-image" />
            )}
            </div>
            <div className="descripcion">
                <h1 className="titulo">{producto.nombre}</h1>
                <p>{producto.descripcion}</p>
                <div class="detalles">
                    <div>
                        <h3>Medidas</h3>
                        <p>100 × 35 × 200 cm</p>
                    </div>
                    <div>
                        <h3>Materiales</h3>
                        <p>Estructura de acero, estantes de roble</p>
                    </div>
                    <div>
                        <h3>Acabado</h3>
                        <p>Laca mate ecológica</p>
                    </div>
                    <div>
                        <h3>Características</h3>
                        <p>5 estantes ajustables</p>
                    </div>
                    </div>
                    <button className='btnCarrito'>Añadir al carrito</button>
            </div>
            
        </div>
        </>
    )
}