import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './productos/ProductList'
import DetallePage from './productos/detalle/Detalle'
import ContactForm from './ContactForm/ContactForm'


function App() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/productos") 
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos")
        return res.json()
      })
      .then((data) => {
        setProductos(data) 
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const verDetalle = (producto) => setProductoSeleccionado(producto)
  const volver = () => setProductoSeleccionado(null)
  const agregarAlCarrito = (producto) => {
    if (producto)
      setCantidadCarrito(cantidadCarrito + 1);
  }
    

  return (
    <>
      <Navbar cantidadCarrito={cantidadCarrito} />
      <main>
        {productoSeleccionado ? (
          <DetallePage producto={productoSeleccionado} volver={volver} agregarAlCarrito={agregarAlCarrito}/>
        ) : (
          <ProductList
            productos={productos}
            loading={loading}
            error={error}
            verDetalle={verDetalle}
          />
        )}
      </main>
      <ContactForm />
      <Footer />
    </>
  )
}

export default App
