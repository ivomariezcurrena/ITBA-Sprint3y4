# ITBA-Sprint3y4

Proyecto: Sitio de catálogo de productos "Hermanos Jota"

Integrantes:
- Ivo Mariezcurrena
- Leonel Martínez
- Franco Liutkevier
- Agustina Lezica
- Mayra Limachi

---

## Requisitos
- Node.js >= 16 (recomendado)
- npm >= 8

---

## Estructura del repositorio (resumen)
- backend/ — API Express, sirve datos y imágenes
  - server.js
  - routes/
  - data/
  - img/
- client/mi-app — aplicación React (Vite)
  - src/ (App.jsx, componentes, estilos)
  - public/
- README.md (este archivo)

---

## Instalación y ejecución

1) Backend
```bash
# filepath: /home/ivoma/ITBA-Sprint3y4
cd backend
npm install
# iniciar en desarrollo (usa nodemon si está configurado) o con node
npm run dev   # si existe script dev
# o
node server.js
```
- El backend escucha por defecto en: http://localhost:3000
- Endpoints principales:
  - GET /api/productos
  - GET /img/<nombre-de-imagen>

2) Cliente (React / Vite)
```bash
# filepath: /home/ivoma/ITBA-Sprint3y4
cd client/mi-app
npm install
npm run dev
```
- El cliente Vite por defecto corre en: http://localhost:5173 (o puerto que muestre la consola)
- Para producción: `npm run build` y servir la carpeta `dist` como corresponda.

Notas:
- Si `npm run dev` falla por permisos (binarios en node_modules/.bin sin +x), ejecutar:
  ```bash
  # desde client/mi-app
  find node_modules/.bin -type f -exec chmod +x {} \;
  ```
  o reinstalar dependencias:
  ```bash
  rm -rf node_modules
  npm install
  ```

---

## Comprobaciones rápidas si no carga datos (Failed to fetch)
- Asegurar que el backend está corriendo (`curl -i http://localhost:3000/api/productos`)
- Revisar CORS: el servidor ya usa `cors()` en `server.js`
- Verificar puertos y que el cliente pida la misma URL `http://localhost:3000`
- Revisar consola del navegador (DevTools → Network / Console) para mensajes concretos

Comandos útiles:
```bash
# comprobar procesos escuchando
ss -ltnp | grep -E "5173|3000"
# probar endpoint
curl -i http://localhost:3000/api/productos
```

---

## Arquitectura y decisiones principales

- Backend (Node.js + Express)
  - Rutas en `routes/` (ej. `GET /api/productos`, `GET /api/productos/:id`).
  - Datos estáticos en `backend/data/products.json`.
  - Imágenes servidas desde `/img` con `express.static`.
  - CORS habilitado con `cors()` para desarrollo.
  - Logging básico y manejador de errores centralizado en `server.js`.
  - Scripts: `npm run dev` (nodemon) y `npm start` (node).

- Cliente (React + Vite)
  - Estructura por componentes: `ProductList`, `Card`, `Detalle`, `ContactForm`, `Navbar`, `Footer`.
  - Navegación sin router: `App.jsx` controla vistas por estado ('producto' | 'detalle' | 'contacto').
  - Peticiones a backend con `fetch("http://localhost:3000/api/productos")`.
  - Construcción de URL de imágenes en componentes:
    - Si `producto.imagen` es relativo, se usa `http://localhost:3000/<ruta>` (ej. `img/...png`).
  - Gestión de UI/estado relevante:
    - `ProductList` usa `useMemo` para memorizar el filtrado por búsqueda (mejora rendimiento).
    - La vista detalle recibe `producto` por prop y permite `agregarAlCarrito`.
    - Carrito: contador simple en `App.jsx` (estado en memoria).
  - ContactForm:
    - Componente `ContactForm/ContactForm.jsx` con validación básica y feedback visual; por ahora envía a consola y muestra mensaje de éxito.
  - Estilos: CSS por componente (Card.css, detalle.css, Navbar.css, Footer.css). Navbar con `backdrop-filter` para efecto glass.

- UX, accesibilidad y diseño
  - Tarjetas con sombra, hover y diseño centrado.
  - Página de detalle con imagen grande y detalles en grid.
  - Footer responsivo y menú que se adapta en móvil.
---
