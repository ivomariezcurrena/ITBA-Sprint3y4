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
  const [vista, setVista] = useState('producto')

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

  const verDetalle = (producto) => {
    setProductoSeleccionado(producto)
    setVista('detalle')
  }
  const volver = () => {
    setProductoSeleccionado(null)
    setVista('producto')
  }
  const mostrarContacto = () => {
    setProductoSeleccionado(null)
    setVista('contacto')
  }

  const agregarAlCarrito = (producto) => {
    if (producto)
      setCantidadCarrito(cantidadCarrito + 1);
  }
    

  return (
    <>
      <Navbar cantidadCarrito={cantidadCarrito} onContacto={mostrarContacto} onProducto={volver}/>
      <main>
        {vista === 'contacto' ? (
          <ContactForm />
        ) : (vista === 'detalle' && productoSeleccionado) ? (
          <DetallePage producto={productoSeleccionado} volver={volver} agregarAlCarrito={agregarAlCarrito}/>
        ) : vista === 'producto' ? (
          <ProductList
            productos={productos}
            loading={loading}
            error={error}
            verDetalle={verDetalle}
          />
        ) : null}
      </main>
      <Footer />
    </>
  )
 }
 
 export default App
