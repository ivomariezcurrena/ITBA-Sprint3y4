import Card from './components/Card'
import './components/Card.css' // estilos de la rejilla

function ProductList({ productos, loading, error }) {
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!productos || productos.length === 0) return <p>No hay productos disponibles.</p>;

  return (
    <>
    <div className="ProductPage">
    <h1 className="PageTitulo">Nuestros Productos</h1>
    <input className="inputBuscar" type="text" placeholder="Buscar productos..." />
    <ul className="product-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {productos.map(p => (
        <Card key={p.id || p.nombre} producto={p} />
      ))}
    </ul>
    </div>
    </>
  );
}

export default ProductList;
