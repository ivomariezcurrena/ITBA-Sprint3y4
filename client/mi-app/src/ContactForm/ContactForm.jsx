import './ContactForm.css'
import { useState } from 'react'


function ContactForm() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [errores, setErrores] = useState({})

  const validar = () => {
    const nuevosErrores = {}
    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.'
    }
    if (!email.trim()) {
      nuevosErrores.email = 'El email es obligatorio.'
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      nuevosErrores.email = 'El email no es valido.'
    }
    if (!mensaje.trim()) {
      nuevosErrores.mensaje = 'El mensaje es obligatorio.'
    }
    return nuevosErrores
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    // Simulación de envío
    setEnviado(true)
    setTimeout(() => {
      setEnviado(false)
      setNombre('')
      setEmail('')
      setTelefono('')
      setMensaje('')
      setErrores({})
    }, 2000)
  }

  return (
    <section className="ContactForm">
      <h2 className="ContactForm-titulo">Contactanos</h2>

      {enviado && (
        <div className="success-message">
          ¡Mensaje enviado! Te contactaremos pronto.
        </div>
      )}

      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Nombre completo *</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre"
          />
          {errores.nombre && <span style={{ color: 'red', fontSize: '0.95em' }}>{errores.nombre}</span>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
          />
          {errores.email && <span style={{ color: 'red', fontSize: '0.95em' }}>{errores.email}</span>}
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="+54 11 1234-5678"
          />
        </div>

        <div className="form-group">
          <label>Mensaje *</label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
          ></textarea>
          {errores.mensaje && <span style={{ color: 'red', fontSize: '0.95em' }}>{errores.mensaje}</span>}
        </div>

        <button type="submit" className="boton enviar">
          Enviar Mensaje
        </button>
      </form>
    </section>
  )
}

export default ContactForm