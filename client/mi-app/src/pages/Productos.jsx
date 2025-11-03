import { useEffect, useState } from "react";
import ProductList from "../productos/ProductList";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/productos`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => setProductos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const verDetalle = (producto) => setProductoDetalle(producto);

  return (
    <ProductList
      productos={productos}
      loading={loading}
      error={error}
      verDetalle={verDetalle}
    />
  );
};

export default Productos;
