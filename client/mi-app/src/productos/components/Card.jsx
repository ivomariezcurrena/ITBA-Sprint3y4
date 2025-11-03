import './Card.css'
import { useNavigate } from "react-router-dom";

export default function Card({ producto = {}, verDetalle }) {
  const navigate = useNavigate();
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const imagenPath = producto.imagenUrl
    ? producto.imagenUrl.match(/^https?:\/\//i)
      ? producto.imagenUrl
      : `${VITE_API_URL}${producto.imagenUrl.startsWith('/') ? '' : '/'}${producto.imagenUrl}`
    : null

  return (
    <li className="card product-card">
      {imagenPath && (
        <img src={imagenPath} alt={producto.nombre} className="card-image" />
      )}

      <div className="card-body">
        <h3 className="title u-uppercase">{producto.nombre}</h3>
        {producto.descripcion && <p className="descripcion">{producto.descripcion}</p>}
        <button onClick={()=> navigate(`/productos/${producto._id}`)} className="boton">Ver detalle</button>
      </div>
    </li>
  )
}