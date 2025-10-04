import './ContactForm.css'
import { useState } from 'react'

function ContactForm() {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [enviado, setEnviado] = useState(false)

    const handleSubmit = (e) => {
         e.preventDefault()


         console.log('Datos del formulario:')
         console.log('Nombre:', nombre)
         console.log('Email:', email) 
         console.log('Teléfono:', telefono)
         console.log('Mensaje:', mensaje)

         setEnviado(true)

         setTimeout(() => {
            setEnviado(false)
            setNombre('')
            setEmail('')
            setTelefono('')
            setMensaje('')
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

        <form className="formulario" onSubmit={handleSubmit}> 

        <div className="form-group">
          <label>Nombre completo *</label>
          <input
            type="text"
            value={nombre}                                  
            onChange={(e) => setNombre(e.target.value)}      
            required
            placeholder="Ingresa tu nombre"
             />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@email.com"
          />
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
            required
            placeholder="Escribe tu mensaje aquí..."
          ></textarea>
        </div>

        <button type="submit" className="boton enviar">
          Enviar Mensaje
        </button>
      </form>
    </section>
  )
}

export default ContactForm