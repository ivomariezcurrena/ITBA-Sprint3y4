function ProductList({ productos, loading, error }) {
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <ul>
      {productos.map(p => (
        <li key={p.id}>{p.nombre} - ${p.precio}</li>
      ))}
    </ul>
  );
}

export default ProductList;
