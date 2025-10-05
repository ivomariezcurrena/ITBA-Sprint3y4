import { useState, useMemo } from 'react'
import Card from './components/Card'
import './components/Card.css'

function ProductList({ productos, loading, error, verDetalle }) {
  const [query, setQuery] = useState('')

  //por lo que lei, useMemo optimiza calculos costosos el filtro solo cambia cuando quey o productos cambian
  const filtered = useMemo(() => {
    const list = productos || []
    const q = (query || '').trim().toLowerCase()
    if (!q) return list
    return list.filter(p => {
      const nombre = (p.nombre || '').toLowerCase()
      const desc = (p.descripcion || '').toLowerCase()
      return nombre.includes(q) || desc.includes(q)
    })
  }, [productos, query])

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!productos || productos.length === 0) return <p>No hay productos disponibles.</p>;

  return (
    <div className="ProductPage">
      <h1 className="PageTitulo">Nuestros Productos</h1>

      <input
        className="inputBuscar"
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Buscar productos"
      />

      <ul className="product-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filtered.length === 0 ? (
          <li style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem 0' }}>
            No se encontraron productos para "{query}"
          </li>
        ) : (
          filtered.map(p => (
            <Card key={p.id || p.nombre} producto={p} verDetalle={() => verDetalle(p)} />
          ))
        )}
      </ul>
    </div>
  );
}

export default ProductList;
