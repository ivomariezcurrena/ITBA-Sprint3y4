# ITBA-Sprint3y4

Proyecto: Sitio de catálogo de productos "Hermanos Jota"

Integrantes:
- Ivoma (desarrollador principal)
- [Agregar aquí los demás integrantes]

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
- Backend: Express simple que:
  - expone ruta `/api/productos` (router en `routes/products.routes.js`)
  - sirve imágenes estáticas en `/img` (middleware `express.static`)
  - habilita CORS (`cors()`)
- Cliente:
  - App React creada con Vite.
  - Navegación simple por estado; `App.jsx` controla vistas: lista, detalle y contacto.
  - ProductList usa `useMemo` para memorizar el filtrado por búsqueda y evitar recálculos innecesarios.
  - Estilos organizados por componente (Card.css, detalle.css, Navbar.css, Footer.css).
- UX y diseño:
  - Navbar transparente con `backdrop-filter` para efecto glass.
  - Tarjetas de producto con sombra, hover y centro alineado.
  - Página de detalle que reutiliza imágenes servidas desde el backend.
  - Footer responsivo.

---
