import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products)
    } catch (error) {
        
    }
})

router.get('/:id', async (req, res) => {
    try {
        const getOne  = await Product.findOne({ _id: req.params.id })
        // const getOne = Product.find(item => item._id === req.params.id)
        if (getOne !== undefined) {
            return res.status(200).send(getOne);
        }
    } catch (error) {
        return res.status(404).send({ msg: 'Product not found' })   
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            description: req.body.description,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            // reviews: [reviewSchema],
        });

        const newProduct = await product.save();
        if(newProduct) {
            console.log(newProduct)
            return res.status(201).send({ msg: 'New Product Created', data: newProduct  })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error in Creating Product' });
    }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        console.log('inside put req')
        const productId = req.params.id;
        const product = await Product.findOne({ _id: productId });
        if (product) {

            product.name = req.body.name;
            product.image = req.body.image;
            product.brand = req.body.brand;
            product.price = req.body.price;
            product.category = req.body.category;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            
            const updatedProduct = await product.save();
            if(updatedProduct) {
                console.log(updatedProduct)
                return res.status(200).send({ msg: 'Product Updated', data: updatedProduct });
            }
        }

    } catch (error) {
        res.status(500).send({ message: 'Error in Updating Product' });
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const product = Product.findById(req.params.id)
        if (product) {
            await product.remove();
            res.status(204).send({ msg: 'Product Deleted' })
        }
    } catch (error) {
        res.status(500).send({ msg: 'Error in Deletion' })
    }
});

export default router;