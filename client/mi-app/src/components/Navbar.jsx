import './Navbar.css'
import logo from '../assets/logo.svg'

function Navbar() {
  return (
    <nav>
      <a href="index.html">
        <img src={logo} alt="logo" />

      </a>
      <h2>Hermanos Jota</h2>
      <ul>
        <li><a href="/catalogo">PRODUCTOS</a></li>
        <li><a href="/contacto">CONTACTO</a></li>
        <li>
          <a href="#carrito">
            <i className="fa-solid fa-cart-shopping"></i> (<span id="carrito-count">0</span>)
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
