const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../middleware/generateToken');

exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && await user.matchPasswords(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(401)
        throw new Error("Invalid Email or Password .. Please Try Again");
    }
});

exports.getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User Not Found');
    }
});

exports.updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        };
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        });
    } else {
        res.status(400)
        throw new Error("Bad Request, Invalid User Data");
    }
});

exports.regNewUser = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
    const isExistedUser = await User.findOne({ email });
    if (isExistedUser) {
        res.status(400)
        throw new Error("Bad Request, User's Already Signed Up");
    };
    const user = await User.create({ email, name, password });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(400)
        throw new Error("Bad Request, Invalid User Data");
    }
});
