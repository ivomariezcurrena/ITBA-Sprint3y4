const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number
    },
    imagenUrl: {
        type: String
    }
});

module.exports = mongoose.model("Product", productSchema);