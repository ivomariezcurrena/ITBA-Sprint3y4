import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearProducto.css';

const CrearProducto = () => {
  const navigate = useNavigate();
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: null,
    medidas: '',
    materiales: '',
    acabado: '',
    caracteristicas: ''
  });
  
  // Estado para preview de imagen
  const [imagePreview, setImagePreview] = useState(null);
  
  // Estados para la lista de productos
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  
  // Estados de UI del formulario
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProductos();
  }, []);

  // Obtener todos los productos
  const fetchProductos = async () => {
    try {
      setLoadingProductos(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`);
      if (!response.ok) throw new Error('Error al cargar productos');
      const data = await response.json();
      setProductos(data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
    } finally {
      setLoadingProductos(false);
    }
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Crear preview de la imagen
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (error) setError(null);
  };

  // Validar formulario
  const validarFormulario = () => {
    const errores = [];
    
    if (!formData.nombre.trim()) {
      errores.push('El nombre es obligatorio');
    }
    
    if (!formData.precio.trim()) {
      errores.push('El precio es obligatorio');
    } else if (isNaN(formData.precio) || parseFloat(formData.precio) <= 0) {
      errores.push('El precio debe ser un número válido mayor a 0');
    }
    
    if (formData.stock && (isNaN(formData.stock) || parseInt(formData.stock) < 0)) {
      errores.push('El stock debe ser un número válido mayor o igual a 0');
    }
    

    if (formData.imagen) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(formData.imagen.type)) {
        errores.push('El archivo debe ser una imagen (JPG, PNG, GIF)');
      }
      
      // Validar tamaño (máximo 5MB)
      if (formData.imagen.size > 5 * 1024 * 1024) {
        errores.push('El archivo no debe superar los 5MB');
      }
    }
    
    return errores;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errores = validarFormulario();
    if (errores.length > 0) {
      setError(errores.join(', '));
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Usar FormData para enviar archivo
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre.trim());
      formDataToSend.append('descripcion', formData.descripcion.trim());
      formDataToSend.append('precio', parseFloat(formData.precio));
      formDataToSend.append('stock', formData.stock ? parseInt(formData.stock) : 0);
      formDataToSend.append('medidas', formData.medidas.trim());
      formDataToSend.append('materiales', formData.materiales.trim());
      formDataToSend.append('acabado', formData.acabado.trim());
      formDataToSend.append('caracteristicas', formData.caracteristicas.trim());
      
      // Agregar imagen si existe
      if (formData.imagen) {
        formDataToSend.append('imagen', formData.imagen);
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`, {
        method: 'POST',
        body: formDataToSend 
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear el producto');
      }
      
      const nuevoProducto = await response.json();
      
      // Limpiar formulario
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen: null,
        medidas: '',
        materiales: '',
        acabado: '',
        caracteristicas: ''
      });
      setImagePreview(null);
      
      setSuccess(true);
      
      // Recargar la lista de productos desde la API
      await fetchProductos();
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const eliminarProducto = async (producto) => {
    const confirmacion = window.confirm(`¿Estás seguro que deseas eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`);
    
    if (!confirmacion) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos/${producto._id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
      
      // Actualizar lista local
      setProductos(prev => prev.filter(p => p._id !== producto._id));
      
      alert('Producto eliminado exitosamente');
      
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar el producto: ' + error.message);
    }
  };


  return (
    <div className="crear-producto-page">
     

      {/* SECCIÓN: FORMULARIO DE CREACIÓN */}
      <div className="formulario-seccion">
        <h1 className="titulo">Crear Nuevo Producto</h1>
        
        {success && (
          <div className="mensaje-exito">
            ¡Producto creado exitosamente!
          </div>
        )}
        
        {error && (
          <div className="mensaje-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="formulario">
          <div className="campos-grupo">
            <div className="campo">
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Mesa de comedor moderna"
                required
              />
            </div>
            
            <div className="campo">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe las características del producto..."
                rows="3"
              />
            </div>
            
            <div className="campos-fila">
              <div className="campo">
                <label htmlFor="precio">Precio *</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              
              <div className="campo">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
            
            <div className="campo">
              <label htmlFor="medidas">Medidas</label>
              <input
                type="text"
                id="medidas"
                name="medidas"
                value={formData.medidas}
                onChange={handleChange}
                placeholder="Ej: 100 × 35 × 200 cm"
              />
            </div>
            
            <div className="campo">
              <label htmlFor="materiales">Materiales</label>
              <input
                type="text"
                id="materiales"
                name="materiales"
                value={formData.materiales}
                onChange={handleChange}
                placeholder="Ej: Estructura de acero, estantes de roble"
              />
            </div>
            
            <div className="campo">
              <label htmlFor="acabado">Acabado</label>
              <input
                type="text"
                id="acabado"
                name="acabado"
                value={formData.acabado}
                onChange={handleChange}
                placeholder="Ej: Laca mate ecológica"
              />
            </div>
            
            <div className="campo">
              <label htmlFor="caracteristicas">Características</label>
              <textarea
                id="caracteristicas"
                name="caracteristicas"
                value={formData.caracteristicas}
                onChange={handleChange}
                placeholder="Ej: 5 estantes ajustables"
                rows="2"
              />
            </div>
            
            <div className="campo">
              <label htmlFor="imagen">Imagen del Producto</label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={handleChange}
                accept="image/*"
                className="input-file"
              />
             
            </div>
            
            {imagePreview && (
              <div className="preview-imagen">
                <p>Vista previa:</p>
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
            
            <button type="submit" className="btnCrear" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>

      {/* SECCIÓN: LISTA DE PRODUCTOS */}
      <div className="productos-seccion">
        <h2 className="subtitulo">Productos Existentes</h2>
        
        {loadingProductos ? (
          <div className="loading">Cargando productos...</div>
        ) : productos.length === 0 ? (
          <div className="sin-productos">No hay productos disponibles.</div>
        ) : (
          <div className="productos-lista">
            {productos.map((producto) => (
              <div key={producto._id} className="producto-item">
                <div className="producto-imagen">
                  {producto.imagenUrl ? (
                    <img
                      src={producto.imagenUrl.startsWith('http') ? producto.imagenUrl : `http://localhost:3000${producto.imagenUrl}`}
                      alt={producto.nombre}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiA0OEMzNy41MjI4IDQ4IDQyIDQzLjUyMjggNDIgMzhDNDIgMzIuNDc3MiAzNy41MjI4IDI4IDMyIDI4QzI2LjQ3NzIgMjggMjIgMzIuNDc3MiAyMiAzOEMyMiA0My41MjI4IDI2LjQ3NzIgNDggMzIgNDhaIiBmaWxsPSIjRDFENUQ5Ii8+Cjwvc3ZnPg==';
                      }}
                    />
                  ) : (
                    <div className="sin-imagen">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="producto-info">
                  <h3 className="producto-nombre">{producto.nombre}</h3>
                  <p className="producto-descripcion">
                    {producto.descripcion || 'Sin descripción'}
                  </p>
                  <div className="producto-detalles">
                    <span className="precio">${producto.precio?.toLocaleString() || '0'}</span>
                    <span className="stock">Stock: {producto.stock || 0}</span>
                  </div>
                </div>
                
                <div className="producto-acciones">
                  <button
                    onClick={() => navigate(`/productos/`)}
                    className="btnVer"
                    title="Ver detalles"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => eliminarProducto(producto)}
                    className="btnEliminar"
                    title="Eliminar producto"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3,6 5,6 21,6"/>
                      <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                      <line x1="10" y1="11" x2="10" y2="17"/>
                      <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrearProducto;