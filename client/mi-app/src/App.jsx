import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './components/ProductList';

function App() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <>
      <Navbar />
      <main>
        <h1>Lista de productos</h1>
        <ProductList productos={productos} loading={loading} error={error} />
      </main>
      <Footer />
    </>
  )
}

export default App
