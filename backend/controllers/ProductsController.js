const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

exports.fetchAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json({
        message: "Successfully Fetched Products",
        results: products.length,
        products
    });
});

exports.getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        return res.json({
            message: "Successfully Fetched Product",
            product
        });
    } else {
        res.status(404);
        throw new Error("Not Found");
    }
});


exports.deleteProductByAdmin = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
        res.json({ message: "Product Deleted Successfully" });
    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }
});

exports.createProductByAdmin = asyncHandler(async (req, res) => {
    const newProduct = await Product.create({
        name: "Sample Name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "Sample Brand",
        category: "Sample Category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample Description"
    });
    res.status(201).json(newProduct);
});

exports.updateProductByAdmin = asyncHandler(async (req, res) => {
    const { name, price, image, brand, category, countInStock, description } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        name: name || "Sample Name",
        price: price || 0,
        image: image || "/images/sample.jpg",
        brand: brand || "Sample Brand",
        category: category || "Sample Category",
        countInStock: countInStock || 0,
        description: description || "Sample Description"
    }, { new: true });
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product's Not Found");
    }
});
