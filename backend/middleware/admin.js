module.exports = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('You Have to Be Authorized As Admin User');
    };
};
