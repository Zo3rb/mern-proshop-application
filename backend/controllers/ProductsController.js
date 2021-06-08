const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

exports.fetchAllProducts = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: "i"
        }
    } : {}

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
    res.json({
        message: "Successfully Fetched Products",
        results: products.length,
        products,
        page,
        pages: Math.ceil(count / pageSize)
    });
});

exports.fetchTopRatedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
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

exports.createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product Already Reviewed');
        };
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: "Review Has Added" });
    } else {
        res.status(404);
        throw new Error("Product's Not Found");
    }
});
