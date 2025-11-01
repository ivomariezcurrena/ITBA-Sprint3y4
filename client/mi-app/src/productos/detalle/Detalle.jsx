import ModalEliminar from '../components/ModalEliminar';
import './detalle.css'
import {useState} from 'react'

export default function DetallePage({producto, volver, agregarAlCarrito}){
    const [showmodal, setShowmodal] = useState(false);

  const API_BASE = 'http://localhost:3000'
  const imagenPath = producto.imagenUrl
    ? producto.imagenUrl.match(/^https?:\/\//i)
      ? producto.imagenUrl
      : `${API_BASE}${producto.imagenUrl.startsWith('/') ? '' : '/'}${producto.imagenUrl}`
    : null

    function handlerModal(){
        setShowmodal(!showmodal);
    }
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
                    <div className='acciones'>
                    <button className='btnCarrito' onClick={() => agregarAlCarrito(producto)}>Añadir al carrito</button>
                    <button className='btnEliminar' onClick={()=> handlerModal()}>Eliminar</button>
                    </div>
            </div>
            
        </div>
        {showmodal && (
            <ModalEliminar
                abierto={showmodal}
                onClose={handlerModal}
                onConfirm={console.log('Eliminando producto...')}
                producto={producto}
            />
        )}
        </>
    )
}