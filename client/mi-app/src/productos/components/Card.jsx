import './Card.css'

export default function Card({ producto = {} }) {
  const API_BASE = 'http://localhost:3000'
  const imagenPath = producto.imagen
    ? producto.imagen.match(/^https?:\/\//i)
      ? producto.imagen
      : `${API_BASE}/${encodeURI(producto.imagen)}`
    : null

  return (
    <li className="card product-card">
      {imagenPath && (
        <img src={imagenPath} alt={producto.nombre} className="card-image" />
      )}

      <div className="card-body">
        <h3 className="title u-uppercase">{producto.nombre}</h3>
        {producto.descripcion && <p className="descripcion">{producto.descripcion}</p>}
        <button className="boton">Ver detalle</button>
      </div>
    </li>
  )
}