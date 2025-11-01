import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DetallePage from "../productos/detalle/Detalle";

const ProductoDetalle = ({ agregarAlCarrito }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Cargando detalle del producto con ID:", id);
    fetch(`/api/productos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar el producto");
        return res.json();
      })
      .then(data => setProducto(data))
      .catch(() => setProducto(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <DetallePage
      producto={producto}
      volver={() => navigate(-1)}
      agregarAlCarrito={agregarAlCarrito}
    />
  );
};

export default ProductoDetalle;
