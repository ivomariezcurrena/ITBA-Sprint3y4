const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const productosRouter = require("./routes/products.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
  });
  next();
});

app.use(cors());
app.use(express.json());

app.use("/api/productos", productosRouter);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});


app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

// manejador de errores
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(chalk.yellow(`API escuchando en http://localhost:${PORT}`));
});
