const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

module.exports = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.APP_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error.message);
            res.status(401);
            throw new Error("Not Authorized, Bad or Not Valid Token");
        }
    };
    if (!token) {
        res.status(401)
        throw new Error("Not Authorized, No Token's Found");
    }
});
