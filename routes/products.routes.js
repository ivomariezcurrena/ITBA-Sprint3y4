
const express = require("express");


const router = express.Router();
const PRODUCTS = require("../data/products.json"); 


/**
 * GET /api/productos
 * Devuelve el listado completo de productos
 */
router.get("/", (req, res) => {
  res.json(PRODUCTS);
});

/**
 * GET /api/productos/:id
 * Devuelve un producto por id o 404 si no existe
 */
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = PRODUCTS.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: `Producto con id ${id} no encontrado` });
  }

  res.json(producto);
});

module.exports = router;
