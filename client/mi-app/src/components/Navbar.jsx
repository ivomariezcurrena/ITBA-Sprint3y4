import './Navbar.css'
import logo from '../assets/logo.svg'

function Navbar({ cantidadCarrito, onContacto, onProducto }) {
  return (
    <nav>
      <a href="index.html">
        <img src={logo} alt="logo" />
      </a>
      <h2>Hermanos Jota</h2>
      <ul>
        <li><a href="#" onClick={(e) => { e.preventDefault(); onProducto && onProducto(); }}>PRODUCTOS</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); onContacto && onContacto(); }}>CONTACTO</a></li>
        <li>
          <a href="#carrito">
            <i className="fa-solid fa-cart-shopping"></i>
            {cantidadCarrito > 0 && <span>{cantidadCarrito}</span>}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
