const Product = require ('../models/product');
const asyncHandler = require('express-async-handler');

// get all products
const getProducts = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find( {} );
        res.status(200).json(products);
    } catch(err) {
        res.status(500);
        throw new Error(err.message);
    }
});

// get single product
const getProduct = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch(err) {
        res.status(500);
        throw new Error(err.message);
    }
});

const addProduct = asyncHandler(async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch(err) {
        console.log(err.message);
        res.status(500);
        throw new Error(err.message);
    }
});

const updateProduct = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product) {
            res.status(404);
            throw new Error(`Cannot find any product with ID ${id}`);
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch(err) {
        res.status(500);
        throw new Error(err.message);
    }
});

const deleteProduct = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            res.status(404);
            throw new Error(`Cannot find any product with ID ${id}`);
        }
        res.status(200).json(product);
    } catch(err) {
        res.status(500);
        throw new Error(err.message);
    }
});

module.exports = {
    getProducts, getProduct, addProduct, updateProduct, deleteProduct
}