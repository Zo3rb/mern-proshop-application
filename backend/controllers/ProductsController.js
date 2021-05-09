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
    console.log(req.params.id);
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
