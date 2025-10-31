import { Product } from '../Models/Product';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try{
        const product = await Product.findById(id);

        if(!product){
            const error = new Error("Producto no encontrado.");
            error.status = 404;
            return next(error);
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const productCreated = await Product.create(req.body);

        res.status(201).json(productCreated);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const productNewData = req.body;
    try {
        const productUpdated = await Product.findByIdAndUpdate(
            id,
            productNewData,
            { new: true, runValidators: true }
        );

        if (!productUpdated){
            const error = new Error("No se pudo modificar el producto.");
            error.status = 404;
            return next(error);
        }

        res.status(200).json(productUpdated);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const productDeleted = await Product.findByIdAndDelete(id);
        
        if(!productDeleted){
            const error = new Error("No se pudo eliminar el producto.");
            error.status = 404;
            return next(error);
        }
        res.status(200).json(productDeleted);
    } catch (error) {
        next(error);
    }
});

export default router;